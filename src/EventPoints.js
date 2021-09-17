import React, {useMemo, useCallback, useRef} from 'react'
import * as THREE from 'three'
import { EventSphere } from './EventSphere';

const EventPoints = () => {

    const eventList = [];

    eventList.push(<EventSphere coords={[0,0,0]} color="#ff0000"/>);
    
    return(
        <group>
            {eventList}
        </group>
    )
}

export default EventPoints;