import React, {useState} from 'react'
import * as THREE from 'three'
import tweenCamera from "./CameraTravese"
import {useThree} from "@react-three/fiber";


/* 
    What draws the event spheres.
    For animation putpose, it was modified a bit.
    Currently, the camera stops at coordinate that has hard-coded offset from the target object.
    the camera angle is 
    sphereCoords[x,y,z] = xyz coordinates of the sphere
    targetCoords[x,y,z] = xyz coordinates of target object (picture)
    
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
const PicEventSphere = (props) => {



    const {camera} = useThree();

    // props has coordinates as array of 3 elements.
    const sphereCentre = new THREE.Vector3(props.sphereCoords[0], props.sphereCoords[1], props.sphereCoords[2]);
    const [hovered, setHover] = useState(false)
    let colour = "black"
    // change colour (maybe convert to texture later on.)



    return(
        <mesh 
        position={sphereCentre}
        scale={hovered ? 1.2 : 1}
        onClick={() => tweenCamera(camera, props.targetCoords, props.duration)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        >
            <sphereGeometry />
            <meshBasicMaterial color={colour}/>
        </mesh>
        
    )

}
export default PicEventSphere;