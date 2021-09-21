import React from "react";
import Gallery from "./Gallery";
import {Html} from '@react-three/drei';
import './DetailWindow.css'



const DetailWindow = (props) => {

        // get the state of this component.
        const eventList = require("../Events/eventData.json")
        // get the target event based on id
        console.log(eventList)
        const thisEvent = eventList.events.filter(element => element.id === props.id)
        if (thisEvent.length > 1) {
            console.log("There are duplicate IDs");
        }

        const state = {
            targetEvent: thisEvent[0],
        }


        return (
            <Html className="detailWindow" fullscreen center >
                <div className="Slide">
                    <div className="main-container">
                        <div className="img-container">
                            <img className="main-img" src={state.targetEvent.imgSrc}
                                 alt={state.targetEvent.imgAlt}/>
                        </div>
                        <div className="caption-container">
                            <h1 className="heading">{state.targetEvent.title}</h1>
                            <h3>{state.targetEvent.dateText}</h3>
                            <p>
                                {state.targetEvent.description}
                            </p>
                        </div>
                    </div>
                    <Gallery targetEvent={state.targetEvent}/>
                </div>
            </Html>
        )

}

export default DetailWindow;