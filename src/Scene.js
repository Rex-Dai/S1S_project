import React, {useContext, useEffect, useState, useMemo, Suspense} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import Platform from "./Platform/Platform";
import {EventContext, TimelineState} from './Events/EventContext';
import PoICollection from './Events/PoICollection';
import * as THREE from 'three'
import { ModelContext } from './Events/ModelContext';
import {Stars} from "@react-three/drei";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import TextLabel from "./Platform/TextLabel";
import { AboutUs } from './Events/AboutUs';
import {More} from "./Events/More";
import Birds from "./Birds";
import tweenCamera from "./Events/CameraTravese";


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
    const { eventState, timelinePos, setAmbientIntensity, setEventState} = useContext(EventContext)

    const birdPosition = [10,170,-162];


    const categoryLabel =[];

    categoryLabel.push(<TextLabel position={[platformSettings.verticalStartCoordinate,
        platformSettings.horizontalStartCoordinate, -3]} text={"Australia"} key="Australia" colour={"#ffff00"} />)
    categoryLabel.push(<TextLabel position={[platformSettings.verticalStartCoordinate + 12.5,
        platformSettings.horizontalStartCoordinate, -3]} text={"World"} key="World" colour={"#ffff00"} />)


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

    const manageTraverseBackAtBird = () => {
        if (eventState === TimelineState.BIRD) {
            setAmbientIntensity(0.15)
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [timelinePos.x, timelinePos.y, timelinePos.z], "toTimeline",
                () => {
                    setEventState(TimelineState.TIMELINE)
                },  2500)
        } else if (eventState === TimelineState.INFO) {
            setEventState(TimelineState.TOBIRD);
            tweenCamera(camera, birdPosition, "bird", () => {
                setEventState(TimelineState.BIRD)
                // display the about us html
                // random number to stop triggering other posters
            }, 1500);
        }
    }


    return (
        <group>
            <group className={"handleVisibility"} visible={eventState === TimelineState.BIRD ||
            eventState === TimelineState.TOBIRD || eventState === TimelineState.INFO}>
                <group className={"handleLabels"} onPointerMissed={manageTraverseBackAtBird} >
                    <AboutUs birdPosition={birdPosition}/>
                </group>
                <Suspense fallback={null}>
                    <mesh className={"handleBirdsPositions"} position={birdPosition}>
                        <Birds />
                    </mesh>
                </Suspense>
            </group>
            <More birdPosition={birdPosition} />
            <Platform platformSettings={platformSettings} />
            <PoICollection platformSettings={platformSettings} />\
            {categoryLabel}
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

