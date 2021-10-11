import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, {useContext, useMemo, useState} from "react";
import tweenCamera from "./CameraTravese";
import {EventContext} from "./EventContext";
import {useThree} from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";


const PoIPoster = (props) => {


    const { eventState, setEventState, timelinePos } = useContext(EventContext)

    const { camera } = useThree();

    const texture = useMemo(() => new THREE.TextureLoader().load(img
        // ,load => console.log(load),
        // progress => console.log(progress),
        // error => console.log(error)
        ), []);
    const handleTraverseBack = () => {
        if (eventState === "poi") {
            setEventState("timeline")
            tweenCamera(camera, [timelinePos.x,timelinePos.y + 5,timelinePos.z], props.duration, true)
        }
    }

    return (
        <group position={props.position}
               rotation={[120.9,0,0]}
               onPointerMissed={() => handleTraverseBack()}>
            <mesh >
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture}/>
            </mesh>

        </group>
    )
}


export default PoIPoster