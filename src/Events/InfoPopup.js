import {Html} from '@react-three/drei';
import './style.css'

export const InfoPopup = (props) => {

        return (
            <Html className={props.className}>
                <div className="popup">
                    {props.text}
                </div>
            </Html>
        )
}