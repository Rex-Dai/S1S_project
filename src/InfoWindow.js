import React from 'react'
import { Html } from '@react-three/drei';
const InfoWindow = (props) => {
    
    return (
        <Html
        style={{
            position: 'absolute',
            top: props.top,
            left: props.left,
        }}
        >
            <div className="info-window">
                InfoWindow
                <button onClick={() => console.log("clicked")}>
                    set active
                </button>
            </div>
        </Html>
    )
}

export default InfoWindow;