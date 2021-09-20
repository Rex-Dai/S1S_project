import React, {useState, useRef, useEffect} from 'react'
import * as THREE from 'three'
import InfoWindow from './InfoWindow';
import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {controllers} from "three/examples/jsm/libs/dat.gui.module";

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

    const {
        camera,
        scene,
        gl: {domElement}} = useThree();


    const TWEEN = require('@tweenjs/tween.js');
    
    // offset of camera from target object [xyz]
    const cameraOffset = [0,-5,0];
    const sphereCentre = new THREE.Vector3(props.sphereCoords[0], props.sphereCoords[1], props.sphereCoords[2]);
    const cameraCurrentPos = new THREE.Vector3().copy( camera.position );
    const cameraTargetPos = new THREE.Vector3(
        props.targetCoords[0] + cameraOffset[0],
        props.targetCoords[1] + cameraOffset[1],
        props.targetCoords[2] + cameraOffset[2]);
    //const cameraAngle = new THREE.Vector3().copy( camera.rotation );
    const targetObjectPos = new THREE.Vector3(props.targetCoords[0], props.targetCoords[1], props.targetCoords[2]);
    
    // props has coordinates as array of 3 elements.
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    let colour = "black"
    // change colour (maybe convert to texture later on.)

    // this is the tween to interpolate the position
    let posTween = new TWEEN.Tween( cameraCurrentPos )
    .to( cameraTargetPos, props.duration )
    .easing( TWEEN.Easing.Quadratic.Out )
    .onUpdate( () => {
        camera.position.copy( cameraCurrentPos );
        camera.lookAt(targetObjectPos);
    })
    .onComplete( () => {
        camera.position.copy( cameraTargetPos );
        camera.lookAt(targetObjectPos);
    })

    // this is the tween to interpolate camera angle
    // tried, but I think there's a better way
    // let viewTween = new TWEEN.Tween( cameraAngle )
    // .to( cameraTargetAngle, props.duration )
    // .easing( TWEEN.Easing.Back.InOut )
    // .onUpdate( function () {
    //     camera.rotation.copy(cameraAngle);
    // } )
    // .onComplete( function () {
    //     camera.rotation.copy( cameraTargetAngle );
    // })


    // Move camera to target position
    function tweenCamera( coords, duration ) {

        posTween.start();
    }

    useFrame(({ gl, camera, scene}) => {
        TWEEN.update();
        gl.render(scene,camera);
    }, 1)



    return(
        <mesh 
        position={sphereCentre}
        scale={hovered ? 1.2 : 1}
        onClick={() => tweenCamera(props.targetCoords, 1000)}
        onPointerMissed={() => setActive(false)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        >
            <sphereGeometry />
            <meshBasicMaterial color={colour}/>
        </mesh>
        
    )

}
export default PicEventSphere;