import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Platform from "./Platform/Platform";
import { EventContext, TimelineState } from './Events/EventContext';
import PoICollection from './Events/PoICollection';
import * as THREE from 'three'
import {Stars} from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const platformSettings = {
    verticalStartCoordinate: -10,
    verticalInterval: 5,
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
        }
    }

    const loader = new GLTFLoader();

    loader.load( 'src/Models/need_some_space/scene.gltf', function ( gltf ) {

        scene.add( gltf );

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
    const [activePoster, setActivePoster] = useState(null)
    // const spotLight = new THREE.SpotLight("white")
    const { scene } = useThree();
    // scene.add(spotLight);
    const value = { eventState, setEventState, timelinePos, setTimelinePos, activePoster, setActivePoster};

    return (
        <EventContext.Provider value={value}>
            <Scene />
            <Stars factor={7} fade={true}/>
        </EventContext.Provider>
    );
}
