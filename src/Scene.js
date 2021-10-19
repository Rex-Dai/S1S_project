import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Platform from "./Platform/Platform";
import { EventContext, TimelineState } from './Events/EventContext';
import PoICollection from './Events/PoICollection';
import * as THREE from 'three'
import {Stars} from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";


const platformSettings = {
    verticalStartCoordinate: -20,
    verticalInterval: 10,
    horizontalStartCoordinate: 20,
    horizontalInterval: 26,
    monthInterval: 2
}

const Scene = () => {

    const { camera, gl, scene } = useThree()

    const { eventState} = useContext(EventContext)

    const TWEEN = require('@tweenjs/tween.js');
    // take over the rendering loop
    useFrame(({ gl, camera, scene }) => {
        TWEEN.update();
        gl.render(scene, camera);
    }, 1)

    useEffect(() => {
        camera.position.set(0, -10, 8);
        camera.lookAt(0, 5, 0);
    }, [])

    useEffect(() => {
        window.addEventListener('wheel', onMouseWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', onMouseWheel);
        }
    },[eventState])

    function onMouseWheel(event) {
        event.preventDefault();
        if(eventState === TimelineState.TIMELINE){
            camera.position.y -= event.deltaY * 0.005;
        } else{

        }
    }

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load( './Models/need_some_space/scene.gltf', function ( gltf ) {
        console.log(gltf)
        gltf.scene.position.set(-650,100,-300)
        gltf.scene.scale.set(5,5,5)
        scene.add( gltf.scene );


    }, undefined, function ( error ) {

        console.error( error );

    } );

    return (
        <group>
            <Platform platformSettings={platformSettings} />
            <PoICollection platformSettings={platformSettings} />
        </group>
    )
}


export default Scene;

export const SceneEventController = () => {

    const [eventState, setEventState] = useState(TimelineState.TIMELINE);
    const [timelinePos, setTimelinePos] = useState([0,0,0])
    const spotLight = new THREE.SpotLight("white")
    const { scene } = useThree();
    // scene.add(spotLight);
    const value = { eventState, setEventState, timelinePos, setTimelinePos, spotLight};

    return (
        <EventContext.Provider value={value}>
            <Scene />
            <Stars count={10000} factor={7} fade={true}/>
        </EventContext.Provider>
    );
}
