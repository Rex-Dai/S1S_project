// This is the object to display detailed PoI information
import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, { useState, useContext } from "react";
import { EventContext } from './EventContext';
import tweenCamera from './CameraTravese';
import { useThree } from "@react-three/fiber";

const PoIDetail = (props) => {

    const { eventState, setEventState } = useContext(EventContext)
    const { camera } = useThree();
    const texture = new THREE.TextureLoader().load(img
        // ,load => console.log(load),
        // progress => console.log(progress),
        // error => console.log(error)
    );
    const [zoomed, setZoomed] = useState(false)
    const [posZ, setPosZ] = useState(props.position[2])
    const [posX, setPosX] = useState(props.position[0])
    const posY = props.position[1]

    function wheelMovement(event) {

        if (eventState === "poi") {
            setPosZ(posZ - event.deltaY * 0.005)

        } else if (eventState === "zoomed") {
            // enable x scroll, make movement slower
            setPosZ(posZ - event.deltaY * 0.001)
            setPosX(posX - event.deltaX * 0.001)
        }
    }

    function handleClick() {
        if (eventState === "poi") {
            
            // move camera closer
            tweenCamera(camera, [posX, posY+1, posZ], 1000, () => setEventState("zoomed"))
            setZoomed(true)
        } else if(eventState === "zoomed"){

            // move camera back to original
            tweenCamera(camera, [posX, posY, posZ], 1000, () => setEventState("poi"))
            setZoomed(false)
        }
    }

    function handlePointerMissed(){
        if(eventState === "poi"){
            tweenCamera(camera,props.startCoords,2000,() => setEventState("timeline"))
        }
    }

    // function onTransitionEnd() {
    //     setEventState("timeline")
    // }

    return (
        <mesh rotation={[120.9, 0, 0]}
            position={[posX, posY, posZ]}
            onClick={handleClick}
            onWheel={wheelMovement}
            onPointerMissed={handlePointerMissed}>
            <planeGeometry args={[5, 10]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

export default PoIDetail