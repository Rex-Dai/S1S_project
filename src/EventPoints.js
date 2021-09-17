import React, {useMemo, useCallback, useRef} from 'react'
import * as THREE from 'three'
import { EventSphere } from './EventSphere';

const EventPoints = () => {

    const eventData = require("./eventData.json")
    const eventList = [];

    console.log(eventData.events[0].title);
    eventData.events.forEach( element => {

        eventList.push(<EventSphere 
            coords={element.coordinate}
            category={element.category}
        />)
    })
    //eventList.push(<EventSphere coords={[0,0,0]} color="#ff0000"/>);

    return(
        <group>
            {eventList}
        </group>
    )
}

export default EventPoints;