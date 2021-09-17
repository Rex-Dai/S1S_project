import React, {useState, useRef} from 'react'
import { Html } from '@react-three/drei';
const InfoWindow = (props) => {

    const [active, setActive] = useState(true)
    
    return (
        <Html
        style={{
            position: 'absolute',
            top: props.top,
            left: props.left,
            visibility: active ? "visible" : "hidden"
        }}
        >
            <div className="info-window">
                InfoWindow
                <button onClick={() => console.log("clicked")}>
                    set active
                </button>
            </div>
        </Html>
        // return the info window.
    )
}

export default InfoWindow;