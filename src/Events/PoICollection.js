import React, { useMemo } from 'react'

import PoIMarker from './PoIMarker';
import PoIPoster from "./PoIPoster";
import { PoIThumbnail } from './PoIThumbnail';

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const demoEvent = eventData.events.filter(element => element.id === 0)[0];

    const thumbnailList = useMemo(() => makeThumbnails(), [])


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

    function makeThumbnails() {
        const thumbnails = []
        eventData.events.forEach((element, index) => {

            let pos = [0, 0, 3]
            let rot = [90, 0, 0]
            // y coordinate
            pos[1] = Math.round(index / 2 - 0.5) * 13 + props.platformSettings.horizontalStartCoordinate
            console.log(index)
            if (index % 2 === 0) {
                pos[0] = -20
                rot[1] = 80
            } else {
                pos[0] = 20
                rot[1] = -80
            }

            thumbnails.push(<PoIThumbnail
                position={pos}
                rotation={deg2rad(rot)}
                targetCoords={[32, 40, 4]} // to be calculated
            />)
        })
        return thumbnails
    }
    // render thumbnails


    // convert degree array to radians. 
    // Used to convert array of degrees to radians
    function deg2rad(degArray) {
        var pi = Math.PI
        var radArray = []
        degArray.forEach((element, index) => {
            radArray[index] = element * pi / 180
        });
        console.log(radArray)
        return radArray
    }




    return (
        <group>
            <PoIMarker position={dateToCoordinate(demoEvent.date)} targetCoords={[32, 40, 4]} duration={duration} />
            {/* <PoIPoster position={[30,40,5]} duration={duration} event={demoEvent}/> */}
            {thumbnailList}
            {/* <PoIThumbnail position={[20,40,5]} rotation={deg2rad([90,-90,0])} /> */}
        </group>
    )
}

export default PoICollection;