import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import tweenCamera from "./CameraTravese";
import { EventContext, TimelineState } from "./EventContext";
import { useThree } from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";
import PoIButton from "./PoIButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


const PoIPoster = (props) => {

    const container = []

    const category = props.event.category;

    
    const { eventState, setEventState, activePoster, cameraOffset } = useContext(EventContext)

    const posterImg = require("../Images/POI-posters/" + props.event.category + "/" + props.event.poster)

    // the default ??????
    const jimp = require('jimp').default;

    const { camera, scene } = useThree();

    const [imageHeight, setImageHeight] = useState(0);

    const [croppedTexture, setCroppedTexture] = useState(null);

    const [model, setModel] = useState(null);

    const [posZ, setPosZ] = useState(props.position[2]);

    // const [posX, setPosX] = useState(props.position[0]);
    const posX = props.position[0]
    const posY = props.position[1];

    const texture = useMemo(() => new THREE.TextureLoader().load(posterImg.default), []);

    const zoomedOffset = [0,-3,0]
    

    function wheelMovement(event) {

        if (activePoster === props.index && eventState === TimelineState.ZOOM){
                // enable x scroll, make movement slower
                setPosZ(posZ - event.deltaY * 0.001)
            }
    }

    function handleClick() {

        if (activePoster === props.index) {
            if (eventState === TimelineState.PoI) {

                // transition to zoom in state
                console.log(imageHeight/220)
                setEventState(TimelineState.DISABLED)
                setPosZ(props.position[2] - imageHeight/440 + 2.5)
                console.log(posZ)

                tweenCamera(camera, props.position, "poiZoomIn", () => setEventState(TimelineState.ZOOM)
                );

                // tweenCamera(camera, zoomedOffset, props.position, [0,0,-0.3],
                //     1000, false,
                //     () => { setEventState(TimelineState.ZOOM) })
                // setZoomed(true)
            } else if (eventState === TimelineState.ZOOM) {

                // transition back to POI state
                setEventState(TimelineState.DISABLED)
                console.log([posX, posY, posZ])

                tweenCamera(camera, props.position, "poiZoomOut", () => setEventState(TimelineState.PoI)
                );

                // tweenCamera(camera, cameraOffset, props.position, [0,0,0], 1000, false,
                //     () => setEventState(TimelineState.PoI))
                
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
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/examples/js/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load('frame.gltf'
            , (gltf) => {

                gltf.scene.position.set(posX, posY + 0.1, posZ)
                gltf.scene.scale.set(8, 7, 7)
                gltf.scene.rotation.set(120.9, 0, 0)
                setModel(gltf);
                scene.add(gltf.scene);

            }, undefined, (error) => {

                console.error(error);

            })

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
                <planeGeometry args={[6.5, 7.7]} />
                <meshStandardMaterial map={croppedTexture} needsUpdate={true} />
            </mesh>)
    } else {
        container.push('')
    }

    if (model) {
        model.scene.visible = eventState !== TimelineState.ZOOM;
    }



    return (
        <group>
            {container}
            <mesh visible={eventState === TimelineState.ZOOM && activePoster === props.index}
                  position={[posX,posY,posZ]} rotation={[120.9, 0, 0]}
                onClick={handleClick}
                onWheel={wheelMovement}
            >
                <planeGeometry args={[6.5, imageHeight / 220]} />
                <meshStandardMaterial map={texture} needsUpdate={true} />
            </mesh>
            <PoIAlbum event={props.event} position={[1, 0, 0]} rotation={[120.9, 0, 0]} />
            {/* <PoIButton position={[-3, 2, 0]} clickEvent={handleTraverseBack} /> */}
        </group>
    )
}


export default PoIPoster