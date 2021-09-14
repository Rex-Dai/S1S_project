import React, { useRef} from 'react'
import {  useThree } from '@react-three/fiber'
import Line from "./Line";



const Scene = () => {
    const { camera, gl } = useThree()
    const ref = useRef();

    return (
        <group>
            <Line index={-10} type={'vertical'} />
            <Line index={-5} type={'vertical'} />
            <Line index={0} type={'vertical'} />
            <Line index={5} type={'vertical'} />
            <Line index={10} type={'vertical'} />
            <Line index={4} type={'horizontal'} />
            <Line index={8} type={'horizontal'} />
            <Line index={12} type={'horizontal'} />
            <Line index={16} type={'horizontal'} />
        </group>
    )
}

export default Scene;