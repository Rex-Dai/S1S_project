import PoIMarker from './PoIMarker';
import React, { useMemo, useState, useContext } from 'react'
import {EventContext, TimelineState} from "./EventContext";

export const PoIMarkerGroup = (props) => {
    const markerList = useMemo(() => makeMarkers(), [])


    function dateToCoordinate(date){
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
        console.log([x,y,z])
        return [x, y, z];
    }

    function makeMarkers(){
        const markers = []
        console.log("Markers created")
        props.eventData.events.forEach((element, index) => {

            markers.push(
                <PoIMarker 
                position={dateToCoordinate(element.date)} 
                targetCoords={[32, 40, 4]} 
                duration={2000} 
                targetCoords={props.posterPosList[index]}
                key={"marker " + index}/>)
        })
        return markers
    }

    return (
        <group>
            {markerList}
        </group>
        )
}
