import React, { useContext, useState, useMemo } from 'react'
import tweenCamera from "./CameraTravese"
import { useThree } from "@react-three/fiber";
import { EventContext, TimelineState } from './EventContext';
import * as THREE from "three";
import { ModelContext } from './ModelContext';

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
    let { eventState, setEventState, setTimelinePos, setActivePoster, cameraOffset } = useContext(EventContext)
    let { globeTexture} = useContext(ModelContext)
    const { camera } = useThree();

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

    // const texture = useMemo(() => new THREE.TextureLoader().load(textureImg.default, console.log), []);

    return (
        <mesh
            position={props.position}
            scale={hovered ? 1 : 0.8}
            onClick={handleClick}
            onPointerOver={handleHoverIn}
            onPointerOut={handleHoverOut}
        >
            <sphereGeometry />
            <meshBasicMaterial map={globeTexture}/>
        </mesh>

    )

}
export default PoIMarker;