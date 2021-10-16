import React, { useMemo, useState } from 'react'
import * as THREE from 'three'
import PoIMarker from './PoIMarker';
import PoIPoster from "./PoIPoster";
import { PoIThumbnail } from './PoIThumbnail';

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const demoEvent = eventData.events.filter(element => element.id === 0)[0];
    // const [spotlightPos, SetSpotlightPos] = useState([0,0,0])
    // const [spotlightTarget, SetSpotlightTarget] = useState([0,0,0])
    // const [spotlightIntensity, setSpotlightIntensity] = useState([0])
    // const [poiSpotlight, SetSpotlight] = useState()

    const posterPosList = useMemo(() => calcPosterPos(), [])
    const posterList = useMemo(() => makePosters(), [])
    const thumbnailList = useMemo(() => makeThumbnails(), [])
    const poiSpotlight = useMemo(() => new THREE.SpotLight(0xffffff))
    const duration = 2000;
    // const spotlighttemp = new THREE.SpotLight( 0xffffff)
    // SetSpotlight(spotlighttemp)
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
                index={index}
                position={pos}
                rotation={deg2rad(rot)}
                hoverIn={onHoverIn}
                hoverOut={onHoverOut}
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
                event={demoEvent}
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

    function onHoverIn(index){
        console.log(poiSpotlight)
        poiSpotlight.intensity = 1;
        poiSpotlight.position.set(posterPosList[index][0],posterPosList[index][1] - 3, posterPosList[index][2] + 3)
    }

    function onHoverOut(){
        poiSpotlight.intensity = 0;
    }

    return (
        <group>
            <PoIMarker position={dateToCoordinate(demoEvent.date)} targetCoords={[32, 40, 4]} duration={duration} />
            {/* <PoIPoster position={[30,40,5]} duration={duration} event={demoEvent}/> */}
            {thumbnailList}
            {posterList}
            {poiSpotlight}
            {/* <PoIThumbnail position={[20,40,5]} rotation={deg2rad([90,-90,0])} /> */}
        </group>
    )
}

export default PoICollection;