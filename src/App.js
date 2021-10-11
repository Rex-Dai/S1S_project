import './App.css';
import { Canvas } from "@react-three/fiber";
import React, { useContext } from 'react';
import { SceneEventController } from './Scene';


const App = () => {

    return (
        <Canvas>
                <SceneEventController />
                <color attach="background" args={0x939383} />
                <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.1} />
                <ambientLight color="#fff" intensity={1} />
            
        </Canvas>
    );
}

export default App;
