import './App.css';
import {Canvas} from "@react-three/fiber";
import React from 'react';
import {SceneEventController} from './Scene';
import {Loader} from "@react-three/drei"


const App = () => {

    return (
        <>
            <Canvas>
                <SceneEventController/>
                {/*<color attach="background" args={0x000000}/>*/}
                {/* <color attach="background" args={0x939383} />*/}
                <color attach="background" args={"#0f1117"} />
                {/* <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.01} /> */}
                 <ambientLight color="#fff" intensity={2} />
            </Canvas>
            <Loader/>
        </>
    );
}

export default App;
