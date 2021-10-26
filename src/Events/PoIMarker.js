import React, { useContext, useState} from 'react'
import tweenCamera from "./CameraTravese"
import { useThree } from "@react-three/fiber";
import { EventContext, TimelineState } from './EventContext';
import * as THREE from "three";
import { ModelContext } from './ModelContext';
import { InfoPopup } from './InfoPopup';

/* 
    This is what draws PoI objects and control events related.
    
    Currently, the camera stops at coordinate that has hard-coded offset from the target object.
    the camera angle is 
    coords[x,y,z] = xyz coordinates of the sphere
    Get target object??
    targetCoords[x,y,z] = xyz coordinates of target object (picture)
    
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
const PoIMarker = (props) => {
    // const textureImg = require("../Images/earth-reduced.jpg")
    let { eventState, setEventState, setTimelinePos, setActivePoster } = useContext(EventContext)
    let { globeTexture, australiaTexture} = useContext(ModelContext)
    const { camera } = useThree();
    const geometry = props.category === "Australia" ? <planeGeometry args={[3,2]}/> :<sphereGeometry />

    // props has coordinates as array of 3 elements.

    const [hovered, setHover] = useState(false)
    
    // const cameraOffset = [0,-5,0]


    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        if (eventState === TimelineState.TIMELINE) {
            setEventState(TimelineState.DISABLED);
            setTimelinePos(curPosition)
            tweenCamera(camera, props.targetCoords, "timeline", () => setEventState(TimelineState.PoI)
            );
            // activate poster
            setActivePoster(props.index)
        }
    }

    function handleHoverIn() {

        if (eventState === TimelineState.TIMELINE) {
            props.hoverIn(props.index)
            setHover(true)
            // display info window
        }
    }

    function handleHoverOut() {

        if (eventState === TimelineState.TIMELINE) {
            props.hoverOut()
            setHover(false)
        }
    }


    return (
        <mesh
            position={props.position}
            scale={hovered ? 1 : 0.8}
            rotation={[1.5708, 0, 0]}
            onClick={handleClick}
            onPointerOver={handleHoverIn}
            onPointerOut={handleHoverOut}
        >
            {geometry}
            <meshBasicMaterial map={props.category === "World" ? globeTexture : australiaTexture}/>
            <InfoPopup text={props.text} className={hovered && eventState === TimelineState.TIMELINE ? "visible" : "invisible"}/>
        </mesh>

    )

}
export default PoIMarker;