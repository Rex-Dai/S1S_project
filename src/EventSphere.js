import { Sphere } from '@react-three/drei';
import React, {useMemo, useCallback, useRef} from 'react'
import * as THREE from 'three'

/* 
    What draws the event spheres.
    coords[x,y,z] = xyz coordinates of the sphere
    color: color (hex code) of the sphere
 */
export const EventSphere = (props) => {
    // props has coordinates as array of 3 elements.

    const ref = useRef();

    const centre = new THREE.Vector3(props.coords[0], props.coords[1], props.coords[2]);
    return(
        <mesh position={centre}>
            <sphereGeometry />
            <meshBasicMaterial color={props.color}/>
        </mesh>
    )


}