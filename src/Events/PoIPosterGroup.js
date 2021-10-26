import PoIPoster from './PoIPoster'
import React, {useContext, useLayoutEffect, useMemo} from 'react'
import {EventContext} from "./EventContext";

export const PoIPosterGroup = (props) => {

    const posterList = useMemo(() => makePosters(), [])

    const { setItems, setLoaded} = useContext(EventContext)



    function makePosters() {
        const posters = []
        props.eventData.events.forEach((element, index) => {
            posters.push(<PoIPoster
                position={props.posterPosList[index]}
                event={element}
                index={index}
                key={"poster " + element.id}
            />)
        })
        return posters
    }

    return (
        <group>
            {posterList}
        </group>
        )
}
