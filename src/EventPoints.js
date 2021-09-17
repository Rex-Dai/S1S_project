import React, {useMemo, useCallback, useRef} from 'react'
import { EventSphere } from './EventSphere';

const EventPoints = () => {

    const eventData = require("./eventData.json")
    const eventList = [];

    eventData.events.forEach( element => {

        eventList.push(<EventSphere 
            coords={element.coordinate}
            category={element.category}
        />)
    })

    return(
        <group>
            {eventList}
        </group>
    )
}

export default EventPoints;