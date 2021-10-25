import PoIPoster from './PoIPoster'
import React, {useContext, useLayoutEffect, useMemo, useState} from 'react'
import {EventContext} from "./EventContext";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

export const PoIPosterGroup = (props) => {



    const posterList = useMemo(() => makePosters(), [])

    const { setItems, setModel} = useContext(EventContext)

    useLayoutEffect(() => {
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        // make api call
        fetch(databaseUrl + '?q=' + props.eventData.events[0].databaseQuery + '&resource_id=' +
            props.eventData.events[0].databaseID)
            .then(res => res.json())
            .then(response => {
                setItems(response.result.records);
            })


    }, [])

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
