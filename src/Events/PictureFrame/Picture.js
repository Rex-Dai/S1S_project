import * as THREE from 'three'
import img from './warPic.png'


const Picture = (props) => {

    const loader = new THREE.TextureLoader();
    const texture = loader.load(img);
    console.log(texture)


    return (
        <mesh rotation={[120.9,0,0]} position={props.position}>
            <planeGeometry attach="geometry" args={[3, 3]}>
                <meshBasicMaterial attach="material" map={texture} side={THREE.FrontSide} />
            </planeGeometry>
        </mesh>
    )

}


export default Picture