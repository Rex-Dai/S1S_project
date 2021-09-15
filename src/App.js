import './App.css';
import {Canvas, useThree} from "@react-three/fiber";
import Scene from './Scene'
import { useEffect, useRef } from "react";
import {PerspectiveCamera} from "@react-three/drei";

const App = () => {

    return (
            <Canvas>
                <Scene />
                <color attach="background" args={0x939383}/>
                <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.1}/>
                <ambientLight color="#fff" intensity={1}/>
            </Canvas>
    );
}

export default App;
