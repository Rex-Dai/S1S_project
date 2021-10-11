import React from 'react'
import { Html } from '@react-three/drei';
import { Link } from 'react-router-dom';

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
                <h3>InfoWindow</h3> 
                <a href="/detail">
                <button type="button">
                    Read more
                </button>
                </a>
                
            </div>
        </Html>
    )
}

export default InfoWindow;