import * as THREE from 'three'
import React, {useContext, useEffect, useLayoutEffect, useMemo, useState} from "react";
import tweenCamera from "./CameraTravese";
import {EventContext, TimelineState} from "./EventContext";
import {useThree} from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";


const PoIPoster = (props) => {

    const [model, setModel] = useState(null);

    const container = []

    const {eventState, setEventState, timelinePos, activePoster} = useContext(EventContext)

    const posterImg = require("../Images/POI-posters/" + props.event.category + "/" + props.event.poster)

    // the default ??????
    const jimp = require('jimp').default;

    const {camera, scene} = useThree();

    const [imageHeight, setImageHeight] = useState(0);

    const [croppedTexture, setCroppedTexture] = useState(null);

    const [posZ, setPosZ] = useState(props.position[2]);

    const [posX, setPosX] = useState(props.position[0]);

    const posY = props.position[1];

    const texture = useMemo(() => new THREE.TextureLoader().load(posterImg.default), []);


    function wheelMovement(event) {

        if (activePoster === props.index && eventState === TimelineState.ZOOM) {
            // enable x scroll, make movement slower
            setPosZ(posZ - event.deltaY * 0.001)
        }
    }

    function handleClick() {

        if (activePoster === props.index) {
            if (eventState === TimelineState.PoI) {

                // transition to zoom in state
                setEventState(TimelineState.DISABLED)
                tweenCamera(camera, [posX, posY + 1, posZ], 1000, false,
                    () => {
                        setEventState(TimelineState.ZOOM)
                    })
                // setZoomed(true)
            } else if (eventState === TimelineState.ZOOM) {

                // transition back to POI state
                setEventState(TimelineState.DISABLED)
                tweenCamera(camera, [posX, posY, posZ], 1000, false,
                    () => setEventState(TimelineState.PoI))
            }
        }
    }

    // const handleTraverseBack = () => {
    //     if (eventState === TimelineState.PoI) {
    //         setEventState(TimelineState.DISABLED)
    //         tweenCamera(camera, [timelinePos.x, timelinePos.y + 5, timelinePos.z], props.duration, true,
    //             () => setEventState(TimelineState.TIMELINE))
    //     }
    // }

    useLayoutEffect(() => {
        jimp.read(posterImg.default)
            .then(image => {
                setImageHeight(image.bitmap.height)
                image.crop(0, 0, 1400, 1800)
                    .getBase64Async(jimp.AUTO)
                    .then(cropped => {
                        setCroppedTexture(new THREE.TextureLoader().load(cropped))
                    })
            })
            .catch(e => console.log(e))

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/examples/js/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load('frame.gltf'
            , (gltf) => {

                gltf.scene.position.set(posX, posY + 0.1, posZ)
                gltf.scene.scale.set(8, 7, 7)
                gltf.scene.rotation.set(120.9, 0, 0)
                setModel(gltf.scene)
                 scene.add(gltf.scene)
            }, undefined, (error) => {

                console.error(error);

            })


    }, []);


    // const container = useMemo(() => {
    //     return [].push(<mesh onClick={handleClick} onWheel={wheelMovement}>
    //         <planeGeometry args={[6.5, 7.7]}/>
    //         <meshStandardMaterial map={croppedTexture} needsUpdate={true}/>
    //     </mesh>)
    // }, [isLoaded])

    if (croppedTexture) {
        container.push(
            <mesh onClick={handleClick} onWheel={wheelMovement} rotation={[120.9, 0, 0]}
                  visible={eventState !== TimelineState.ZOOM} position={props.position}>
                <planeGeometry args={[6.5, 7.7]}/>
                <meshStandardMaterial map={croppedTexture} needsUpdate={true}/>
            </mesh>)
    } else {
        container.push('')
    }

    if (model) {
        model.visible = eventState !== TimelineState.ZOOM;
    }


    return (
        <group>
            {container}
            <mesh visible={eventState === TimelineState.ZOOM && activePoster === props.index}
                  position={[posX, posY, posZ]} rotation={[120.9, 0, 0]}
                  onClick={handleClick}
                  onWheel={wheelMovement}
            >
                <planeGeometry args={[6.5, imageHeight / 220]}/>
                <meshStandardMaterial map={texture} needsUpdate={true}/>
            </mesh>
            <PoIAlbum event={props.event} position={[props.position[0] + 5.8, props.position[1], props.position[2]]}
                      rotation={[120.9, 0, 0]}/>
            {/* <PoIButton position={[-3, 2, 0]} clickEvent={handleTraverseBack} /> */}
        </group>
    )
}


export default PoIPoster