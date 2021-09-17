import { Sphere } from '@react-three/drei';
import React, {useState, useRef} from 'react'
import * as THREE from 'three'
import InfoWindow from './InfoWindow';

/* 
    What draws the event spheres.
    coords[x,y,z] = xyz coordinates of the sphere
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
export const EventSphere = (props) => {
    // props has coordinates as array of 3 elements.

    const ref = useRef();
    const infoWindowActive = useRef(true);
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    var colour = "#ffffff"
    // change colour (maybe convert to texture later on.)
    switch (props.category){
        case "Battle":
            colour = "#ff0000"
            break;
        default:
            break;
    }


    const centre = new THREE.Vector3(props.coords[0], props.coords[1], props.coords[2]);
    return(
        <mesh 
        position={centre}
        scale={hovered ? 1.2 : 1}
        onClick={() => setActive(!active)}
        onPointerMissed={() => setActive(false)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        >
            <sphereGeometry />
            <meshBasicMaterial color={colour}/>
            {active ? <InfoWindow top={50} left={50}/> : null}
            {/* <InfoWindow top={50} left={50}/> */}
        </mesh>
        
    )


}