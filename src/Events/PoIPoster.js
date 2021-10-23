import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, {useContext, useMemo, useState} from "react";
import tweenCamera from "./CameraTravese";
import {EventContext, TimelineState} from "./EventContext";
import {useThree} from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";
import PoIButton from "./PoIButton";


const PoIPoster = (props) => {

    var category = props.event.category;
    const posterImg = require("../Images/POI-posters/" + props.event.category +"/" + props.event.poster)

    
    // console.log(posterImg)
    const { eventState, setEventState, timelinePos } = useContext(EventContext)

    const { camera } = useThree();

    const [posZ, setPosZ] = useState(props.position[2])
    const [posX, setPosX] = useState(props.position[0])
    const posY = props.position[1]

    function wheelMovement(event) {

        if (eventState === TimelineState.PoI) {
            setPosZ(posZ - event.deltaY * 0.005)

        } else if (eventState === TimelineState.ZOOM) {
            // enable x scroll, make movement slower
            setPosZ(posZ - event.deltaY * 0.001)
        }
    }

    function handleClick() {
        if (eventState === TimelineState.PoI) {

            // move camera closer
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [posX, posY+1, posZ], 1000, false,
                () => {setEventState(TimelineState.ZOOM)})
            // setZoomed(true)
        } else if(eventState === TimelineState.ZOOM){

            // move camera back to original
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [posX, posY, posZ], 1000, false,
                () => setEventState(TimelineState.PoI))
        }
    }


    const texture = useMemo(() => new THREE.TextureLoader().load(posterImg.default), []);

    const handleTraverseBack = () => {
        if (eventState === TimelineState.PoI) {
            console.log(eventState)
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [timelinePos.x,timelinePos.y + 5,timelinePos.z], props.duration, true,
                () => setEventState(TimelineState.TIMELINE))
        }
    }

    return (
        <group rotation={[120.9,0,0]}
               position={[posX, posY, posZ]}
               >
            <mesh onClick={handleClick} onWheel={wheelMovement}>
                <planeGeometry args={[5, props.event.posterHeight/280]} />
                <meshStandardMaterial map={texture}/>
            </mesh>
            <PoIAlbum event={props.event} position={[5,0,0]}/>
            <PoIButton position={[-3,2,0]} clickEvent={handleTraverseBack}/>
        </group>
    )
}


export default PoIPoster