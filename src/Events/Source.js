import React, { useState, useContext, useMemo} from 'react'
import tweenCamera from "./CameraTravese"
import { EventContext, TimelineState } from './EventContext';
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {Html} from '@react-three/drei';
import TextLabel from "../Platform/TextLabel";

// this is the component to display the about us page
// About us only accessible from the timeline state.
// uses disabled state when looking at about us
export const Source = (props) => {

    // just a geometry that takes us to the position
    let { eventState, setEventState, setTimelinePos, setActivePoster, activePoster } = useContext(EventContext)
    const targetCoords = [0,0,30]
    const { camera } = useThree();


    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        if (eventState === TimelineState.TIMELINE) {
            setEventState(TimelineState.DISABLED);
            setTimelinePos(curPosition)
            tweenCamera(camera, targetCoords, "timeline", () => {
                setEventState(TimelineState.PoI)
                // display the about us html
                // random number to stop triggering other posters
                setActivePoster(101)
            });
            // activate poster
        }
    }


    return (
        <mesh
            position={[13.5, 20.5, -5]}
            onClick={handleClick}
        >
            <mesh position={[4,0.5,0]} rotation={[1.5708, 0, 0]} visible={false}>
                <planeGeometry args={[6.5,2]}/>
                <meshBasicMaterial />
            </mesh>
            <TextLabel text={"Source"} position={[0,0,0]}/>
            <SourceHtml position={targetCoords} visible={eventState === TimelineState.PoI
            && activePoster === 101 ? "visible" : "invisible"} />
        </mesh>
    )
}

// this is the html page that will display.
const SourceHtml = (props) => {

    return(
        <group position={[-85,50,80]} rotation={[1.5708, 0, 0]}>
            <Html className={props.visible}>
                {/* <div className="about-container"> */}

                <iframe src="source.html" title="source" className="about-container">

                </iframe>

                {/* </div> */}
            </Html>
        </group>

    )
}