import './App.css';
import {Canvas} from "@react-three/fiber";
import Scene from './Scene'
import { BrowserRouter, Route } from "react-router-dom";
import {DetailWindowPre} from "./DetailWindow/DetailWindowPre";


const App = () => {

    return (
        <BrowserRouter>

            <Route path="/detail">
                <DetailWindowPre id={1}/>
            </Route>

            <Route path='/' exact>
                <Canvas>
                    <Scene />
                    <color attach="background" args={0x939383} />
                    <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.1} />
                    <ambientLight color="#fff" intensity={1} />
                </Canvas>
            </Route>


        </BrowserRouter>


        // <Canvas>
        //     <Scene />
        //     <color attach="background" args={0x939383}/>
        //     <pointLight position={[0, 0, 3]} color="#f7f3ce" intensity={0.1}/>
        //     <ambientLight color="#fff" intensity={1}/>
        // </Canvas>
    );
}

export default App;
