import React, { useState, useContext, useMemo} from 'react'
import tweenCamera from "../Events/CameraTravese"
import { EventContext, TimelineState } from '../Events/EventContext';
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {Html} from '@react-three/drei';
import TextLabel from "../Platform/TextLabel";

// this is the component to display the about us page
// About us only accessible from the timeline state.
// uses disabled state when looking at about us
export const AboutUs = (props) => {

    // just a geometry that takes us to the position
    let { eventState, setEventState, setActivePoster, activePoster } = useContext(EventContext)
    const geometry = <planeGeometry args={[20, 5, 1]} />
    const targetCoords = [props.birdPosition[0],props.birdPosition[1] - 50,props.birdPosition[2] - 20]
    const { camera } = useThree();


    function handleClick() {
        if (eventState === TimelineState.BIRD) {
            setEventState(TimelineState.INFO)
            tweenCamera(camera, targetCoords, "timeline", () => {
                // display the about us html
                // random number to stop triggering other posters
                setActivePoster(100)
            }, 1500);
            // activate poster
        }
    }


    return (
        <mesh
            position={[props.birdPosition[0] - 6, props.birdPosition[1] , props.birdPosition[2] + 2]}
            onClick={handleClick}
            rotation={[-0.9,0,0]}
            // onPointerOver={handleHoverIn}
            // onPointerOut={handleHoverOut}
        >
            <mesh position={[10,1,0]} visible={false}>
                {geometry}
                <meshBasicMaterial/>
            </mesh>
            <TextLabel rotation={[0,0,0]} text={"About Us"} height={0.3} size={3}/>
            <mesh position={[3,-6.5,0]}>
                <TextLabel rotation={[0,0,0]} text={"To Be Continued...."} size={1} height={0.2}/>
            </mesh>
            <AboutUsHtml position={targetCoords}
                         visible={eventState === TimelineState.INFO && activePoster === 100 ? "visible" : "invisible"}/>
        </mesh>
    )
}

// this is the html page that will display.
const AboutUsHtml = (props) => {

    return(
        <group rotation={[-0.9,0,0]} position={[-50,-10,8]}>
            <Html className={props.visible}>
                {/* <div className="about-container"> */}
                    
                    <iframe src="./about.html" title="about" className="about-container">

                </iframe>

                {/* </div> */}
            </Html>
        </group>

    )
}