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

        // console.log([x,y,z])
        return [x, y, z];
    }

    function makeMarkers(){
        const markers = []
        console.log("Markers created")
        props.eventData.events.forEach((element, index) => {

            markers.push(
                <PoIMarker 
                position={dateToCoordinate(element.date, element.category)} 
                targetCoords={[32, 40, 4]} 
                duration={2000} 
                targetCoords={props.posterPosList[index]}
                index={index}
                togglePoster={props.togglePoster}
                hoverIn={props.hoverIn}
                hoverOut={props.hoverOut}
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
