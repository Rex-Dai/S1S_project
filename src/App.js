import './App.css';
import { Canvas } from "@react-three/fiber";
import Scene from './Scene'
import { useEffect, useRef } from "react";

const App = () => {

    return (
            <Canvas>
                <color attach="background" args={0x939383}/>
                <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.1}/>
                <ambientLight color="#fff" intensity={1}/>
                <Scene/>
            </Canvas>
    );
}

export default App;
