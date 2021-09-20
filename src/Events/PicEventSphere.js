import React, {useState, useRef, useEffect} from 'react'
import * as THREE from 'three'
import InfoWindow from './InfoWindow';
import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {controllers} from "three/examples/jsm/libs/dat.gui.module";

/* 
    What draws the event spheres.
    coords[x,y,z] = xyz coordinates of the sphere
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
const PicEventSphere = (props) => {

    const {
        camera,
        scene,
        gl: {domElement}} = useThree();


    const TWEEN = require('@tweenjs/tween.js');
    const centre = new THREE.Vector3(props.coords[0], props.coords[1], props.coords[2]);
    // props has coordinates as array of 3 elements.
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    let colour = "black"
    // change colour (maybe convert to texture later on.)

    function tweenCamera( targetPosition, duration ) {



        let position = new THREE.Vector3().copy( camera.position );

        let tween = new TWEEN.Tween( position )
            .to( targetPosition, duration )
            .easing( TWEEN.Easing.Back.InOut )
            .onUpdate( function () {
                camera.position.copy( position );
                camera.lookAt(targetPosition);
            } )
            .onComplete( function () {
                camera.position.copy( targetPosition );
                camera.lookAt( targetPosition );
            } )
            .start();
    }

    useFrame(({ gl, camera, scene}) => {
        TWEEN.update();
        gl.render(scene,camera);
    }, 1)



    return(
        <mesh 
        position={centre}
        scale={hovered ? 1.2 : 1}
        onClick={() => tweenCamera([0,0,-10], 10000)}
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