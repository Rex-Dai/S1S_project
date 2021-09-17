import React, {useState} from 'react'
import { Html } from '@react-three/drei';
const InfoWindow = (props) => {

    const [active, setActive] = useState(false)
    return (
        <Html
        style={{
            position: 'absolute',
            top: props.top,
            left: props.left
        }}
        >
            <div className="info-window">
                InfoWindow
            </div>
        </Html>
        // return the info window.
    )
}

export default InfoWindow;