import React, {useContext, useEffect, useState} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import Platform from "./Platform/Platform";
import {EventContext, TimelineState} from './Events/EventContext';
import PoICollection from './Events/PoICollection';
import {Stars} from "@react-three/drei";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import TextLabel from "./Platform/TextLabel";
import {copyValue} from "three/examples/jsm/libs/ecsy.module";


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

    const [labelY, setLabelY] = useState(platformSettings.horizontalStartCoordinate)

    const categoryLabel =[];

    categoryLabel.push(<TextLabel position={[platformSettings.verticalStartCoordinate,
        labelY, -3]} text={"Australia"} key="Australia" colour={"#ffff00"} />)
    categoryLabel.push(<TextLabel position={[platformSettings.verticalStartCoordinate + 12.5,
        labelY, -3]} text={"World"} key="Australia" colour={"#ffff00"} />)


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
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load( 'scene.gltf', function ( gltf ) {

            gltf.scene.position.set(-650,100,-300)
            gltf.scene.scale.set(5,5,5)
            scene.add(gltf.scene);
            console.log("added")

        }, undefined, function ( error ) {

            console.error( error );

        } );
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
            // setLabelY(labelY - event.deltaY * 0.005);
            // console.log(labelY)
        }
    }




    return (
        <group>
            <Platform platformSettings={platformSettings} />
            <PoICollection platformSettings={platformSettings} />\
            {categoryLabel}
        </group>
    )
}


export default Scene;

export const SceneEventController = () => {

    const [eventState, setEventState] = useState(TimelineState.TIMELINE);
    const [timelinePos, setTimelinePos] = useState([0,0,0])
    const [activePoster, setActivePoster] = useState(null)
    const [items, setItems] = useState([])
    // const spotLight = new THREE.SpotLight("white")
    const { scene } = useThree();
    // scene.add(spotLight);
    const value = { eventState, setEventState, timelinePos, setTimelinePos,
        activePoster, setActivePoster, items, setItems};

    return (
        <EventContext.Provider value={value}>
            <Scene />
            <Stars factor={7} fade={true}/>
        </EventContext.Provider>
    );
}
