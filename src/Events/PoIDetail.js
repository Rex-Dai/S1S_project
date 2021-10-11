// This is the object to display detailed PoI information
import * as THREE from 'three'
import img from '../Images/warPic.png'
import React, {useState} from "react";

const PoIDetail = (props) => {

    const texture = new THREE.TextureLoader().load(img
        // ,load => console.log(load),
        // progress => console.log(progress),
        // error => console.log(error)
        );
    const [active, setActive] = useState(false)

    return (
        <mesh rotation={[120.9,0,0]}
              position={props.position}
              onClick={() => setActive(!active)}
              onPointerMissed={() => setActive(false)}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={texture}/>
        </mesh>
    )
}

export default PoIDetail