import PoIPoster from './PoIPoster'
import React, {useContext, useLayoutEffect, useMemo} from 'react'
import {EventContext} from "./EventContext";

export const PoIPosterGroup = (props) => {

    const posterList = useMemo(() => makePosters(), [])

    const { setItems, setLoaded} = useContext(EventContext)

    useLayoutEffect(() => {
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        // make api call
        fetch(databaseUrl + '?q=' + props.eventData.events[0].databaseQuery + '&resource_id=' +
            props.eventData.events[0].databaseID)
            .then(res => res.json())
            .then(response => {
                setItems(response.result.records);
                setLoaded(true)
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
