import * as THREE from 'three';
import React, { useRef } from 'react'


const TextLabel = (props) => {

    /*
     This solution works but not implemented by JSX
     */

    const ref = useRef();
    const loader = new THREE.FontLoader();
    const request = new XMLHttpRequest();
    request.open("GET", "./Fonts/helvetiker_regular.typeface.json", false);
    request.send(null)
    const my_JSON_object = JSON.parse(request.responseText);
    const font = loader.parse(my_JSON_object);

    const textOptions = {
        font,
        size: 1.5,
        height: 0.2,
    };

    if (props.height && props.size) {
        textOptions.height = props.height
        textOptions.size = props.size
    }

    /*
    The JSX implementation
    The loader.parse needs a json obj, the JSON.parse need a serialized string as arg
    Thus, the correct imp is open the file with request and pass in the content text
    ! This is the common pattern of deserializing obj from JSON file in JS !
     */

    return (
        <mesh rotation={props.rotation ? props.rotation : [1.5708, 0, 0]}
              position={props.position ? props.position : [0,0,0]} ref={ref}>
            <textGeometry attach={'geometry'} args={[props.text, textOptions]} />
            <meshBasicMaterial attach="material" color={"#ffffff"} />
        </mesh>
    )

}

export default TextLabel;