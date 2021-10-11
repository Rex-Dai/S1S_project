import React, {useEffect, useContext, useState} from 'react'

import PoIMarker from './PoIMarker';
import PoIPicture from "../Archieved/PictureFrame/Picture";
import PoIDetail from './PoIDetail';
import { EventContext } from './EventContext';


const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const eventList = [];
    const { eventState } = useContext(EventContext)

    const dateToCoordinate = (date) => {
        let x,y,z,year,month;

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
        return [x,y,z];
    }

    // Render the elements
    eventData.events.forEach( element => {
        let coordinate = dateToCoordinate(element.date)
            eventList.push(<PoIMarker
            position={coordinate}
            key={"" + element.date + element.category}
        />)
    })

    return(
        <group>
            {eventList}
            <PoIMarker position={[0,0,0]} targetCoords={[200,20,5]} duration={2000}/>
            <PoIPicture position={[30,40,5]}/>
            <PoIDetail position={[10,20,5]} startCoords={[0,-10,8]}/>
        </group>
    )
}

export default PoICollection;