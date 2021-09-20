import React, {useEffect, useRef} from 'react'
import { useThree} from '@react-three/fiber'
import Platform from "./Platform/Platform";
import EventsCollection from './Events/EventsCollection';


const platformSettings = {
    verticalStartCoordinate: -20,
    verticalInterval: 10,
    horizontalStartCoordinate: 20,
    horizontalInterval: 26,
    monthInterval:2
}

const Scene = () => {
    const { camera, gl, scene } = useThree()
    const ref = useRef();



    useEffect(() => {
        window.addEventListener('wheel', onMouseWheel, {passive:false});
    })
    useEffect(() => {
        camera.position.set(0,-10,8);
        camera.lookAt(0,5,0);
    },[])

    const onMouseWheel = (event) => {
        event.preventDefault();
        camera.position.y -= event.deltaY*0.005;
    }

    return (
        <group>
            <Platform platformSettings={platformSettings} />
            <EventsCollection platformSettings={platformSettings} />
        </group>
    )
}

export default Scene;