// This is the object to display detailed PoI album
import React, {useLayoutEffect, useMemo, useReducer, useState} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {mapLinear} from "three/src/math/MathUtils";


const PoIAlbum = (props) => {

    const container = [];

    const loader = new THREE.TextureLoader();

    const [items, setItems] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false)


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

    const [index, setIndex] = useState(0);


    useLayoutEffect(() => {
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        // make api call
        fetch(databaseUrl + '?q=' + props.event.databaseQuery + '&resource_id=' + props.event.databaseID)
            .then(res => res.json())
            .then(response => {
                setItems(response.result.records);
                setIsLoaded(true)
            })
    }, [])


    /*
     U need allow CORS to run following code
     */


    const filteredPicTexture = useMemo(() => {
        return items.filter(element => {
            const date = new Date(element["Temporal"]);
            const eventDate = new Date(props.event["date"])
            return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth();
        }).map(item => {
            return loader.load(item["High resolution image"]);
        })
    }, [isLoaded])

    const geometry = new THREE.PlaneGeometry(5, 5);
    let flag = false
    if (filteredPicTexture[0] && !flag) {
        flag = !flag;
        // const material = new THREE.MeshBasicMaterial();
        // material.map = filteredPicTexture[0];
        // material.needsUpdate = true
        // const mesh = new THREE.Mesh(geometry,material);
        // scene.add(mesh);
        container.push(
            <mesh  position={props.position}
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