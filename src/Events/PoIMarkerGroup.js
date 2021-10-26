import PoIMarker from './PoIMarker';
import React, { useMemo } from 'react'

export const PoIMarkerGroup = (props) => {

    const markerList = useMemo(() => makeMarkers(), [])

    function dateToCoordinate(date, category){
        // used to calculate the position of markers
        let x, y, z, year, month, day;
        try {
            date = new Date(date);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
        } catch (error) {
            console.error(error)
        }

        // todo need to decide the x axis mapping;
        x = day/31 * 8

        y = (year - 1914) * props.platformSettings.horizontalInterval +
            props.platformSettings.horizontalStartCoordinate +
            month * props.platformSettings.monthInterval;

        //todo need to decide the mapping of event at z axis
        z = 0;

        // category offset
        if(category === "Australia"){
            x = x - 8
        }

        return [x, y, z];
    }

    function makeMarkers(){
        const markers = []
        props.eventData.events.forEach((element, index) => {

            markers.push(
                <PoIMarker 
                position={dateToCoordinate(element.date, element.category)}
                duration={1000} 
                targetCoords={props.posterPosList[index]}
                index={index}
                hoverIn={props.hoverIn}
                hoverOut={props.hoverOut}
                category={element.category}
                text={element.title + ", " + element.date}
                key={"marker " + element.id}/>)
        })
        return markers
    }

    return (
        <group>
            {markerList}
        </group>
        )
}
