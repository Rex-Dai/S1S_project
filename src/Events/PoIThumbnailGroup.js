import PoIThumbnail from './PoIThumbnail';
import React, { useMemo } from 'react'

export const PoIThumbnailGroup = (props) => {
    const thumbnailList = useMemo(() => makeThumbnails(), [])


    // render thumbnails
    function makeThumbnails() {
        
        const rotY = 90 * Math.PI / 180
        const rotX = 90 * Math.PI / 180
        const offsetX = 30
        const thumbnails = []
        props.eventData.events.forEach((element, index) => {

            let pos = [0, 0, 5]
            let rot = [rotX, 0, 0]
            // y coordinate
            pos[1] = Math.round(index / 2 - 0.5) * 13 + 20
            if (index % 2 === 0) {
                pos[0] = -offsetX
                rot[1] = rotY
            } else {
                pos[0] = offsetX
                rot[1] = -rotY
            }
            thumbnails.push(<PoIThumbnail
                event={element}
                index={index}
                position={pos}
                rotation={rot}
                togglePoster={props.togglePoster}
                hoverIn={props.hoverIn}
                hoverOut={props.hoverOut}
                targetCoords={props.posterPosList[index]} // to be calculated
                key={"thumbnail " + element.id}
            />)
        })
        return thumbnails
    }

    return (
        <group>
            {thumbnailList}
        </group>
        )
}
