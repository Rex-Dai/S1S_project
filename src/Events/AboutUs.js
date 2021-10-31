import React, { useState, useContext, useMemo} from 'react'
import tweenCamera from "./CameraTravese"
import { EventContext, TimelineState } from './EventContext';
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {Html} from '@react-three/drei';

// this is the component to display the about us page
// About us only accessible from the timeline state.
// uses disabled state when looking at about us
export const AboutUs = (props) => {

    // just a geometry that takes us to the position
    let { eventState, setEventState, setTimelinePos, setActivePoster, activePoster } = useContext(EventContext)
    const geometry = <planeGeometry args={[6, 1.8, 1]} />
    const targetCoords = [0,0,30]
    const { camera } = useThree();
    const [hovered, setHover] = useState(false)
    const textureImg = require("../Images/about.png")
    const texture = useMemo(() => new THREE.TextureLoader().load(textureImg.default), []);

    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        if (eventState === TimelineState.TIMELINE) {
            setEventState(TimelineState.DISABLED);
            setTimelinePos(curPosition)
            tweenCamera(camera, targetCoords, "timeline", () => {
                setEventState(TimelineState.PoI)
                // display the about us html
                // random number to stop triggering other posters
                setActivePoster(100)
            });
            // activate poster
            setHover(false)
        }
    }

    function handleHoverIn() {

        if (eventState === TimelineState.TIMELINE) {
            setHover(true)
            // display info window
        }
    }

    function handleHoverOut() {

        if (eventState === TimelineState.TIMELINE) {
            setHover(false)
        }
    }

    return (
        <mesh
            position={[16, 20, -2]}
            scale={hovered ? 1.1 : 1}
            rotation={[1.5708, 0, 0]}
            onClick={handleClick}
            onPointerOver={handleHoverIn}
            onPointerOut={handleHoverOut}
        >
            {geometry}
            <meshBasicMaterial  map={texture}/>
            <AboutUsHtml position={targetCoords} visible={eventState === TimelineState.PoI
            && activePoster === 100 ? "visible" : "invisible"}/>
        </mesh>
    )
}

// this is the html page that will display.
const AboutUsHtml = (props) => {

    return(
        <group position={[-42,50,0]}>
            <Html className={props.visible}>
                {/* <div className="about-container"> */}
                    
                    <iframe src="./about.html" title="about" className="about-container">

                </iframe>

                {/* </div> */}
            </Html>
        </group>

    )
}