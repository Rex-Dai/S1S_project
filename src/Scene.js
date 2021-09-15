import React, {useEffect, useRef} from 'react'
import {  useThree } from '@react-three/fiber'
import LinePlatform from "./LinePlatform";



const Scene = () => {
    const { camera, gl } = useThree()
    const ref = useRef();

    useEffect(() => {
        window.addEventListener('wheel', onMouseWheel, false);
    })
    useEffect(() => {
        camera.lookAt(0,15,0);
    })

    const onMouseWheel = (event) => {
        event.preventDefault();
        camera.position.y -= event.deltaY*0.005;
    }

    return (
        <group>
            <LinePlatform />
        </group>
    )
}

export default Scene;