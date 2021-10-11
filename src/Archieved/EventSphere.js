import React, {useState} from 'react'
import * as THREE from 'three'
import InfoWindow from '../Archieved/InfoWindow';

/* 
    What draws the event spheres.
    coords[x,y,z] = xyz coordinates of the sphere
    color: color (hex code) of the sphere
    onClick: function to be executed onClick.
 */
export const EventSphere = (props) => {
    // props has coordinates as array of 3 elements.

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    let colour = "#ffffff"
    // change colour (maybe convert to texture later on.)
    switch (props.category){
        case "Australia":
            colour = "#9E5024"
            break;
        case "Global":
            colour = "#34495E"
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
        </mesh>
        
    )


}