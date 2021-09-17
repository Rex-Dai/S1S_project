import React, {useEffect, useRef} from 'react'
import { useThree} from '@react-three/fiber'
import Platform from "./Platform";
import EventPoints from './EventPoints';


const Scene = () => {
    const { camera, gl, scene } = useThree()
    const ref = useRef();

    useEffect(() => {
        window.addEventListener('wheel', onMouseWheel, {passive:false});
    })
    useEffect(() => {
        camera.position.set(0,-10,8);
        camera.lookAt(0,5,0);
    })

    const onMouseWheel = (event) => {
        event.preventDefault();
        camera.position.y -= event.deltaY*0.005;
    }

    return (
        <group>
            <Platform />
            <EventPoints />
        </group>
    )
}

export default Scene;