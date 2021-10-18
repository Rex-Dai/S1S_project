import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, { useContext, useMemo} from "react";
import tweenCamera from "./CameraTravese";
import { EventContext, TimelineState } from "./EventContext";
import { useThree } from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";


export const PoIThumbnail = (props) => {

    const textureImg = require("../Images/POI-thumbnails/Australia/" + props.event.thumbnail)
    const { eventState, setEventState, timelinePos, setTimelinePos } = useContext(EventContext)

    const { camera } = useThree();
    const curPosition = new THREE.Vector3().copy(camera.position);

    function handleClick() {

        // same as poimarker
        if(eventState === TimelineState.TIMELINE){
            setEventState("disabled");
            setTimelinePos(curPosition)
            tweenCamera(camera, props.targetCoords, props.duration, false, () => {setEventState("poi"); props.lightOn()}
            );
            
        }
    }

    function handleHoverIn(){
        props.hoverIn(props.index)
    }

    // load thumbnail texture
    // const texture = useMemo(() => new THREE.TextureLoader().load(eventData.events[props.index].thumbnail.default), []);
    const texture = useMemo(() => new THREE.TextureLoader().load(textureImg.default), []);

    return (
        <mesh rotation={props.rotation}
            position={props.position}
            onClick={handleClick}
            onPointerEnter={handleHoverIn}
            onPointerLeave={props.hoverOut}
        >
            <planeGeometry args={[9, 9]} />
            <meshBasicMaterial map={texture} />
        </mesh>
        // <spotLight color="#fff0f0" position={[20, 40, 5]} target={target} intensity={5}/>
    )
}


export default PoIThumbnail