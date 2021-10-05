import * as THREE from 'three'
import img from './warPic.png'
import React, {useState} from "react";

import DetailWindow from "../../Archieved/DetailWindow/DetailWindow";


const Picture = (props) => {

    
    const texture = new THREE.TextureLoader().load(img,
        load => console.log(load),
        progress => console.log(progress),
        error => console.log(error)
        );
    const [active, setActive] = useState(false)

    return (
        <mesh rotation={[120.9,0,0]}
              position={props.position}
              onClick={() => setActive(!active)}
              onPointerMissed={() => setActive(false)}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={texture}/>
            {active ? <DetailWindow top={50} left={50} id={1}/> : null}
        </mesh>
    )
}


export default Picture