import PoIPoster from './PoIPoster'
import React, { useMemo } from 'react'

export const PoIPosterGroup = (props) => {
    const posterList = useMemo(() => makePosters(), [])

    const brickTexture = useMemo(() => {

    })

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
