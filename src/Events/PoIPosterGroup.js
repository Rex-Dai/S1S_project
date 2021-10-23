import PoIPoster from './PoIPoster'
import React, { useMemo } from 'react'

export const PoIPosterGroup = (props) => {
    const posterList = useMemo(() => makePosters(), [])

    function makePosters() {
        const posters = []
        props.eventData.events.forEach((element, index) => {
            props.activeStates[index] = false
            posters.push(<PoIPoster
                position={props.posterPosList[index]}
                event={element}
                active={props.activeStates[index]}
                key={"poster " + index}
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
