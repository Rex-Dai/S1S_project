import PoIThumbnail from './PoIThumbnail';
import React, { useMemo } from 'react'
import {TextureLoader} from "three";


export const PoIThumbnailGroup = (props) => {

    // const brickTexture = useMemo(() => {
    //     return new TextureLoader().load(require('../Images/pexels-tim-mossholder-3105407.jpeg').default)
    // },[])


    const thumbnailList = useMemo(() => makeThumbnails(), [])
    // render thumbnails
    function makeThumbnails() {
        
        const rotY = 90 * Math.PI / 180
        const rotX = 90 * Math.PI / 180
        const offsetX = 40
        const offsetY = 35
        const thumbnails = []
        let ausIndex = 0
        let worldIndex = 0
        props.eventData.events.forEach((element, index) => {

            let pos = [0, 0, 8]
            let rot = [rotX, 0, 0]
            if(element.category === "Australia"){
                pos[0] = -offsetX
                pos[1] = ausIndex * 13 + offsetY
                ausIndex++
                rot[1] = rotY
            } else{

                pos[0] = offsetX
                pos[1] = worldIndex * 13 + offsetY
                worldIndex++
                rot[1] = -rotY
            }

            thumbnails.push(<PoIThumbnail
                event={element}
                index={index}
                position={pos}
                rotation={rot}
                hoverIn={props.hoverIn}
                hoverOut={props.hoverOut}
                targetCoords={props.posterPosList[index]} // to be calculated
                key={"thumbnail " + element.id}
                // brickTexture={brickTexture}
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
