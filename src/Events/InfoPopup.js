import {Html} from '@react-three/drei';
import './style.css'

export const InfoPopup = (props) => {

    console.log("Ss")
        return (
            <Html className={props.className}>
                <div className="popup">
                    {props.text}
                </div>
            </Html>
        )
}