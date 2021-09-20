import * as THREE from 'three'
import img from './warPic.png'


const Picture = (props) => {

    
    const texture = new THREE.TextureLoader().load(img,
        load => console.log(load),
        progress => console.log(progress),
        error => console.log(error)
        );

    return (
        <mesh rotation={[120.9,0,0]} position={props.position}>
            <planeGeometry args={[5, 5]}/>
            <meshBasicMaterial map={texture}/>
        </mesh>
    )
}


export default Picture