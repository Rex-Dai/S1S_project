import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, {useContext, useMemo, useState} from "react";
import tweenCamera from "./CameraTravese";
import {EventContext} from "./EventContext";
import {useThree} from "@react-three/fiber";
import PoIAlbum from "./PoIAlbum";


const PoIPoster = (props) => {

    const textureImg = require('./img/warPic.png')
    const { eventState, setEventState, timelinePos } = useContext(EventContext)

    const { camera } = useThree();

    const [posZ, setPosZ] = useState(props.position[2])

    const posY = props.position[1]
    const posX = props.position[0]

    function wheelMovement(event) {

        if (eventState === "poi") {
            setPosZ(posZ - event.deltaY * 0.005)

        } else if (eventState === "zoomed") {
            // enable x scroll, make movement slower
            setPosZ(posZ - event.deltaY * 0.001)
        }
    }

    function handleClick() {
        if (eventState === "poi") {

            // move camera closer
            setEventState("disabled")
            tweenCamera(camera, [posX, posY+1, posZ], 1000, false,() => {setEventState('zoomed')})
            // setZoomed(true)
        } else if(eventState === "zoomed"){

            // move camera back to original
            setEventState("disabled")
            tweenCamera(camera, [posX, posY, posZ], 1000, false, () => setEventState("poi"))
        }
    }


    const texture = useMemo(() => new THREE.TextureLoader().load(textureImg.default), []);

    const handleTraverseBack = () => {
        if (eventState === "poi") {

            setEventState("disabled")
            tweenCamera(camera, [timelinePos.x,timelinePos.y + 5,timelinePos.z], props.duration, true,
                () => setEventState("timeline"))
        }
    }


    return (
        <group rotation={[120.9,0,0]}
               position={[posX, posY, posZ]}
               onClick={handleClick}
               onWheel={wheelMovement}
               onPointerMissed={handleTraverseBack}>
               
            <mesh>
                <planeGeometry args={[5, 5]} />
                <meshStandardMaterial map={texture}/>
            </mesh>
            <PoIAlbum event={props.event} position={[5,0,0]}/>
            {/* <spotLight color="#fff0f0" position={[20, 40, 5]} target={target} intensity={5}/> */}
            
        </group>
    )
}


export default PoIPoster