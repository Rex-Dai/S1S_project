// This is the object to display detailed PoI album
import React, {useContext, useEffect, useLayoutEffect, useMemo, useReducer, useState} from "react";
import * as THREE from "three";
import {EventContext, TimelineState} from "./EventContext";
import TextLabel from "../Platform/TextLabel";


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
                date.getMonth() >= eventDate.getMonth() - 4 &&
                date.getMonth() <= eventDate.getMonth() + 4
        }).slice(0, 3)
            .map(item => {
                const subStr = item["Title of image"].split(",");
                return [loader.load(item["High resolution image"]), subStr];
            })
    }, [items])




    if (filteredPicTexture[0]) {
        // const material = new THREE.MeshBasicMaterial();
        // material.map = filteredPicTexture[0];
        // material.needsUpdate = true
        // const mesh = new THREE.Mesh(geometry,material);
        // scene.add(mesh);
        container.push(
            <group position={props.position} visible={true}>
                <mesh rotation={props.rotation}
                      onClick={() => setIndex((index + 1) % filteredPicTexture.length)}>
                    <planeGeometry args={[5, 5]}/>
                    <meshBasicMaterial map={filteredPicTexture[index][0]}/>
                </mesh>
                <TextLabel position={[-2, 0, -3]} text={filteredPicTexture[index][1][0]}
                           colour={"#ffff00"} height={0.04} size={0.3}/>
                <TextLabel position={[-2, 0, -3.4]} text={filteredPicTexture[index][1][1]}
                           colour={"#ffff00"} height={0.04} size={0.3}/>
                <TextLabel position={[-2, 0, -3.8]} text={filteredPicTexture[index][1][2]}
                           colour={"#ffff00"} height={0.04} size={0.3}/>
                <TextLabel position={[-2, 0, -4.2]} text={filteredPicTexture[index][1][3]}
                           colour={"#ffff00"} height={0.04} size={0.3}/>
            </group>
        )
    } else {
        container.push('')
    }


    return (
        <group>{container}</group>
    )
}


export default PoIAlbum;