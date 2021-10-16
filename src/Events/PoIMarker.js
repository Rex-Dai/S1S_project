import React, {useContext, useState} from 'react'
import tweenCamera from "./CameraTravese"
import {useThree} from "@react-three/fiber";
import { EventContext, TimelineState} from './EventContext';
import * as THREE from "three";

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

    let { setEventState, setTimelinePos} = useContext(EventContext)

    const { camera } = useThree();

    // props has coordinates as array of 3 elements.
    
    const [hovered, setHover] = useState(false)
    let colour = "black"

    const curPosition = new THREE.Vector3().copy(camera.position);

    function handleClick() {
        setEventState(TimelineState.DISABLED);
        setTimelinePos(curPosition)
        tweenCamera(camera, props.targetCoords, props.duration, false,() => setEventState(TimelineState.PoI)
        );
    }


    return (
        <mesh
            position={props.position}
            scale={hovered ? 1.2 : 1}
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <sphereGeometry />
            <meshBasicMaterial color={colour} />
        </mesh>

    )

}
export default PoIMarker;