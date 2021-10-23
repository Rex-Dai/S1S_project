import React, { useMemo, useState, useContext } from 'react'
import PoIPoster from "./PoIPoster";
import { PoIThumbnail } from './PoIThumbnail';
import { EventContext, TimelineState } from "./EventContext";
import { PoIMarkerGroup } from './PoIMarkerGroup';

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const { eventState } = useContext(EventContext)
    const [lightPos, SetlightPos] = useState([0, -1, 1])
    const [lightTarget, SetlightTarget] = useState([0, 0, 0])
    const [lightIntensity, SetlightIntensity] = useState([0])

    const posterPosList = useMemo(() => calcPosterPos(), [])
    // const markerList = useMemo(() => makeMarkers(), [])
    const posterList = useMemo(() => makePosters(), [])
    const thumbnailList = useMemo(() => makeThumbnails(), [])
    const light = useMemo(() => <rectAreaLight
        position={lightPos}
        intensity={lightIntensity}
        angle={0.1}
        lookAt={lightTarget}
    />,
        [lightPos, lightIntensity, lightTarget])

    function calcPosterPos() {
        const positions = []
        eventData.events.forEach((element, index) => {

            let pos = [0, 0, 0]
            pos[1] = Math.round(index / 2 - 0.5) * 13
                + props.platformSettings.horizontalStartCoordinate
            if (index % 2 === 0) {
                pos[0] = -20
            } else {
                pos[0] = 20
            }
            positions.push(pos)
        })
        return positions
    }

    // render thumbnails
    function makeThumbnails() {
        console.log("thumbnail created")
        const thumbnails = []
        eventData.events.forEach((element, index) => {

            let targetPos = [0, 0, 0]
            let pos = [0, 0, 5]
            let rot = [90, 0, 0]
            // y coordinate
            pos[1] = Math.round(index / 2 - 0.5) * 13 + props.platformSettings.horizontalStartCoordinate
            if (index % 2 === 0) {
                pos[0] = -30
                rot[1] = 90
            } else {
                pos[0] = 30
                rot[1] = -90
            }
            thumbnails.push(<PoIThumbnail
                event={element}
                index={index}
                position={pos}
                rotation={deg2rad(rot)}
                hoverIn={onHoverIn}
                hoverOut={onHoverOut}
                lightOn={lightOn}
                targetCoords={posterPosList[index]} // to be calculated
                key={"thumbnail " + index}
            />)
        })
        return thumbnails
    }

    function makePosters() {
        const posters = []
        console.log("Poster created")
        eventData.events.forEach((element, index) => {

            posters.push(<PoIPoster
                position={posterPosList[index]}
                event={element}
                key={"poster " + index}
            />)
        })
        return posters
    }

    // convert degree array to radians. 
    // Used to convert array of degrees to radians
    function deg2rad(degArray) {
        var pi = Math.PI
        var radArray = []
        degArray.forEach((element, index) => {
            radArray[index] = element * pi / 180
        });
        // console.log(radArray)
        return radArray
    }

    function onHoverIn(index) {
        // this sets the offset
        SetlightPos([posterPosList[index][0], posterPosList[index][1] - 5, posterPosList[index][2] + 10])
        SetlightTarget([posterPosList[index][0], posterPosList[index][1], posterPosList[index][2]])
        SetlightIntensity(3)

    }

    function onHoverOut() {
        SetlightIntensity(0.1)

    }

    function lightOn() {
        SetlightIntensity(3)
    }

    return (
        <group>
            {/* {markerList} */}
            <PoIMarkerGroup eventData={eventData} platformSettings={props.platformSettings} posterPosList={posterPosList} />
            {thumbnailList}
            {posterList}
            {light}
        </group>
    )
}

export default PoICollection;