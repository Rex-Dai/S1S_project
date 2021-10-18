import React, { useMemo, useState, useContext } from 'react'
import PoIMarker from './PoIMarker';
import PoIPoster from "./PoIPoster";
import { PoIThumbnail } from './PoIThumbnail';
import {EventContext, TimelineState} from "./EventContext";

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const demoEvent = eventData.events.filter(element => element.id === 0)[0];
    const { eventState } = useContext(EventContext)
    const [lightPos, SetlightPos] = useState([0, -1, 1])
    const [lightTarget, SetlightTarget] = useState([0,0,0])
    const [lightIntensity, SetlightIntensity] = useState([0])

    const posterPosList = useMemo(() => calcPosterPos(), [])
    const posterList = useMemo(() => makePosters(), [])
    const thumbnailList = useMemo(() => makeThumbnails(), [])
    const light = useMemo(() => <rectAreaLight
        position={lightPos}
        intensity={lightIntensity}
        angle={0.1}
        lookAt={lightTarget}
         />,
        [lightPos, lightIntensity, lightTarget])

    const duration = 2000;
    
    const dateToCoordinate = (date) => {
        // used to calculate the position of markers
        let x, y, z, year, month;

        try {
            date = new Date(date);
            year = date.getFullYear();
            month = date.getMonth();
        } catch (error) {
            console.error(error)
        }

        // todo need to decide the x axis mapping;
        x = ((-1) ^ ((month + year) % 2)) * (month + year) % 5;

        y = (year - 1914) * props.platformSettings.horizontalInterval +
            props.platformSettings.horizontalStartCoordinate +
            month * props.platformSettings.monthInterval;

        //todo need to decide the mapping of event at z axis
        z = 0;
        return [x, y, z];
    }

    function calcPosterPos() {
        const positions = []
        eventData.events.forEach((element, index) => {

            let pos = [0, 0, 0]
            pos[1] = Math.round(index / 2 - 0.5) * 13
                + props.platformSettings.horizontalStartCoordinate
            if (index % 2 === 0) {
                pos[0] = -30
            } else {
                pos[0] = 30
            }
            positions.push(pos)
        })
        return positions
    }

    // render thumbnails
    function makeThumbnails() {
        console.log("thumbnail created")
        const thumbnails = []
        eventData.events.forEach((element, index) => {

            let targetPos = [0, 0, 0]
            let pos = [0, 0, 5]
            let rot = [90, 0, 0]
            // y coordinate
            pos[1] = Math.round(index / 2 - 0.5) * 13 + props.platformSettings.horizontalStartCoordinate
            if (index % 2 === 0) {
                pos[0] = -50
                rot[1] = 90
            } else {
                pos[0] = 50
                rot[1] = -90
            }
            thumbnails.push(<PoIThumbnail
                event={element}
                index={index}
                position={pos}
                rotation={deg2rad(rot)}
                hoverIn={onHoverIn}
                hoverOut={onHoverOut}
                lightOn={lightOn}
                targetCoords={posterPosList[index]} // to be calculated
                key={"thumbnail " + index}
            />)
        })
        return thumbnails
    }

    function makePosters() {
        const posters = []
        console.log("Poster created")
        eventData.events.forEach((element, index) => {

            posters.push(<PoIPoster
                position={posterPosList[index]}
                event={element}
                key={"poster " + index}
            />)
        })
        return posters
    }

    // convert degree array to radians. 
    // Used to convert array of degrees to radians
    function deg2rad(degArray) {
        var pi = Math.PI
        var radArray = []
        degArray.forEach((element, index) => {
            radArray[index] = element * pi / 180
        });
        // console.log(radArray)
        return radArray
    }

    function onHoverIn(index) {
        if(eventState === TimelineState.TIMELINE){
            // this sets the offset
            SetlightPos([posterPosList[index][0], posterPosList[index][1] -5, posterPosList[index][2] + 5])
            SetlightTarget([posterPosList[index][0],  posterPosList[index][1], posterPosList[index][2]])
            SetlightIntensity(3)
        }
    }
    
    function onHoverOut() {
        if(eventState === TimelineState.TIMELINE){
            SetlightIntensity(0.1)
        }
    }

    function lightOn(){
        SetlightIntensity(3)
    }

    return (
        <group>
            <PoIMarker position={dateToCoordinate(demoEvent.date)} targetCoords={[32, 40, 4]} duration={duration} />
            {thumbnailList}
            {posterList}

            {light}
        </group>
    )
}

export default PoICollection;