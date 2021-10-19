import * as THREE from 'three';
import React, { useRef } from 'react'
import { MeshLambertMaterial } from 'three';


const TextLabel = (props) => {

    /*
     This solution works but not implemented by JSX
     */

    const ref = useRef();
    const loader = new THREE.FontLoader();
    const request = new XMLHttpRequest();
    request.open("GET", "/Fonts/helvetiker_regular.typeface.json", false);
    request.send(null)
    const my_JSON_object = JSON.parse(request.responseText);
    const font = loader.parse(my_JSON_object);

    const textOptions = {
        font,
        size: 1.5,
        height: 0.2,
    };

    /*
    The JSX implementation
    The loader.parse needs a json obj, the JSON.parse need a serialized string as arg
    Thus, the correct imp is open the file with request and pass in the content text
    ! This is the common pattern of deserializing obj from JSON file in JS !
     */

    return (
        <mesh rotation={[120.9, 0, 0]} position={props.position} ref={ref}>
            <textGeometry attach={'geometry'} args={[props.text, textOptions]} />
            <meshLambertMaterial attach="material" emissive={'#ffffff'}/>
        </mesh>
    )

}

export default TextLabel;