// This is the object to display detailed PoI album
import React, {useContext, useEffect, useLayoutEffect, useMemo, useReducer, useState} from "react";
import * as THREE from "three";
import {EventContext, TimelineState} from "./EventContext";


const PoIAlbum = (props) => {

    const container = [];

    const loader = new THREE.TextureLoader();

    const [index, setIndex] = useState(0);

    const {eventState, items} = useContext(EventContext);

    // const initialState = {count: 0};
    //
    // function reducer(state, action) {
    //     switch (action.type) {
    //         case 'increment':
    //             return {count: state.count + 1};
    //         case 'decrement':
    //             return {count: state.count - 1};
    //         default:
    //             throw new Error();
    //     }
    // }
    // const [state, dispatch] = useReducer(reducer, initialState);



    /*
     U need allow CORS to run following code
     */
    const filteredPicTexture = useMemo(() => {
        return items.filter(element => {
            const date = new Date(element["Temporal"]);
            const eventDate = new Date(props.event["date"])
            return eventDate.getFullYear() === date.getFullYear() &&
                date.getMonth() >= eventDate.getMonth() - 1 &&
                date.getMonth() <= eventDate.getMonth() + 1
        }).map(item => {
            return loader.load(item["High resolution image"]);
        })
    }, [items])


    if (filteredPicTexture[0]) {
        // const material = new THREE.MeshBasicMaterial();
        // material.map = filteredPicTexture[0];
        // material.needsUpdate = true
        // const mesh = new THREE.Mesh(geometry,material);
        // scene.add(mesh);
        container.push(
            <mesh  position={props.position} visible={eventState === TimelineState.ZOOM} rotation={props.rotation}
                  onClick={() => setIndex((index + 1) % filteredPicTexture.length)}>
                <planeGeometry args={[5, 5]}/>
                <meshBasicMaterial map={filteredPicTexture[index]}/>
            </mesh>)
    } else {
        container.push('')
    }


    return (
        <group>{container}</group>
    )
}


export default PoIAlbum;