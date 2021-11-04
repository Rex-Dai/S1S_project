import React, {useContext, useEffect, useState, useMemo, Suspense} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import Platform from "./Platform/Platform";
import {EventContext, TimelineState} from './Events/EventContext';
import PoICollection from './Events/PoICollection';
import * as THREE from 'three'
import { ModelContext } from './Events/ModelContext';
import {Stars} from "@react-three/drei";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import MoreCollection from "./More/MoreCollection";


const platformSettings = {
    verticalStartCoordinate: -10,
    verticalInterval: 5,
    horizontalStartCoordinate: 20,
    horizontalInterval: 26,
    monthInterval: 2
}

const Scene = () => {

    const { camera, scene } = useThree()
    // var aboutY = 0
    const { eventState } = useContext(EventContext)

    const TWEEN = require('@tweenjs/tween.js');
    // take over the rendering loop
    useFrame(({ gl, camera, scene }) => {
        TWEEN.update();
        gl.render(scene, camera);
    }, 1)

    useEffect(() => {
        camera.position.set(0, -10, 8);
        camera.lookAt(0, 5, 0);

        const loader = new GLTFLoader();

        loader.load('scene.gltf', function (gltf) {

            gltf.scene.position.set(-100, 50, -50)
            gltf.scene.scale.set(1, 1, 1)
            scene.add(gltf.scene);

        }, undefined, function (error) {

            console.error(error);

        });
    }, [])

    useEffect(() => {
        window.addEventListener('wheel', onMouseWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', onMouseWheel);
        }
    }, [eventState])



    function onMouseWheel(event) {
        event.preventDefault();
        if (eventState === TimelineState.TIMELINE && TimelineState.BIRD) {
            camera.position.y -= event.deltaY * 0.005;
        }
    }

    return (
        <group>
            <MoreCollection />
            <Platform platformSettings={platformSettings} />
            <PoICollection platformSettings={platformSettings} />\
        </group>
    )
}


export default Scene;

export const SceneEventController = () => {

    const [eventState, setEventState] = useState(TimelineState.TIMELINE);
    const [timelinePos, setTimelinePos] = useState([0, 0, 0])
    const [activePoster, setActivePoster] = useState(null)
    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [ambientIntensity, setAmbientIntensity] = useState(0.15)

    const value = { eventState, setEventState, timelinePos, setTimelinePos,
        activePoster, setActivePoster, items, setItems, loaded, setLoaded,
        ambientIntensity, setAmbientIntensity

    };

    return (
        <EventContext.Provider value={value}>
            <ModelContextProvider />
        </EventContext.Provider>
    );
}

const ModelContextProvider = () => {

    // load the texture for globe
    const globeImg = require("./Images/earth-reduced.jpg")
    const globeTexture = useMemo(() => new THREE.TextureLoader().load(globeImg.default), [])
    const australiaImg = require("./Images/australia-reduced.jpg")
    const australiaTexture = useMemo(() => new THREE.TextureLoader().load(australiaImg.default), [])
    const wallImg = require('./Images/brickWall.jpg')
    const wallTexture = useMemo(() =>  new THREE.TextureLoader().load(wallImg.default),[])
    const value = {globeTexture, australiaTexture, wallTexture}

    return (
        <ModelContext.Provider value={value}>
            <Scene />
            <Stars factor={7} fade={true} />
        </ModelContext.Provider>
    );
}

