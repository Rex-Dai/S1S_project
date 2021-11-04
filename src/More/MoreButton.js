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
export const MoreButton = (props) => {

    // just a geometry that takes us to the position
    let { eventState, setEventState, setTimelinePos, setActivePoster,  setAmbientIntensity } = useContext(EventContext)
    const { camera } = useThree();


    function handleClick() {
        const curPosition = new THREE.Vector3().copy(camera.position);
        if (eventState === TimelineState.TIMELINE) {
            setAmbientIntensity(1)
            //reduce lag and make birds visible while traverse
            setEventState(TimelineState.BIRD);
            setTimelinePos(curPosition)
            tweenCamera(camera, props.birdPosition, "bird", () => {
                // display the about us html
                // random number to stop triggering other posters
                setActivePoster(99)
            }, 2500);
            // activate poster
        }
    }


    return (
        <mesh
            position={[13.5, 20, -3]}
            onClick={handleClick}
        >
            <mesh position={[4,0.5,0]} rotation={[1.5708, 0, 0]} visible={false}>
                <planeGeometry args={[6.5,2]}/>
                <meshBasicMaterial />
            </mesh>
            <TextLabel text={"More"}/>
        </mesh>
    )
}

