import * as THREE from 'three';
import React, {useRef} from 'react'
import {useLoader} from "@react-three/fiber";


const TextLabel = (props) => {

    //const font = useLoader(THREE.FontLoader,'/Fonts/helvetiker_regular.typeface.json');
    /*
    \ There might be some internal bug with the useLoader hook!
     */

    // const {scene} = useThree()
    // loader.load('/Fonts/helvetiker_regular.typeface.json', (font) => {
    //     const text = 'three.js';
    //     const geometry = new THREE.TextBufferGeometry(text, {
    //         font: font,
    //         size: 3,
    //         height: 0.2,
    //         curveSegments: 12,
    //         bevelEnabled: true,
    //         bevelThickness: 0.15,
    //         bevelSize: 0.3,
    //         bevelSegments: 5,
    //     });
    //     let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    //
    //     let mesh = new THREE.Mesh( geometry, textMaterial );
    //     mesh.position.set( -10, 10, 0 );
    //     scene.add( mesh );
    // });

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
        size: 2.5,
        height: 0.2,
    };

    /*
    The JSX implementation
    The loader.parse needs a json obj, the JSON.parse need a serialized string as arg
    Thus, the correct imp is open the file with request and pass in the content text
    ! This is the common pattern of deserializing obj from JSON file in JS !
     */

    return (
        <mesh rotation={[120.9,0,0]} position={props.position} ref={ref}>
            <textGeometry attach={'geometry'} args={[props.text, textOptions]}>
                <meshToonMaterial attach={'material'}/>
            </textGeometry>
        </mesh>
    )

}

export default TextLabel;