import React, {useContext, useEffect, useMemo, useState} from 'react'
import * as Three from 'three';
import img from "../Images/BackButton.png"
import {EventContext, TimelineState} from "../Events/EventContext";

const PoIButton = (props) => {

    const { eventState } = useContext(EventContext)
    const [visibility, setVisibility] = useState(false);

    const buttonTexture = useMemo(() => {
        return new Three.TextureLoader().load(img)
    }, [])

    useEffect(() => {
        setVisibility(eventState === TimelineState.PoI)
    }, [eventState])

    return (
        <mesh position={props.position} onClick={props.clickEvent} visible={visibility}
        rotation={props.rotation}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={buttonTexture}/>
        </mesh>
    )
}

export  default PoIButton