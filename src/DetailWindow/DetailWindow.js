import React from "react";
import Gallery from "./Gallery";


export class DetailWindow extends React.Component {
    
    constructor(props){
        super(props)

        // get the state of this component.
        const eventList = require("../Events/eventData.json")
        // get the target event based on id
        console.log(eventList)
        const thisEvent = eventList.events.filter(element => element.id === this.props.id )
        if(thisEvent.length > 1){
            console.log("There are duplicate IDs");
        }

        this.state = {
            targetEvent:thisEvent[0],
        }
    }
    
    // componentDidMount(){
    //     // get the state of this component.
    //     const eventList = require("../Events/eventData.json")
    //     // get the target event based on id
    //     const thisEvent = eventList.events.filter(element => element.id === this.props.id )
    //     if(thisEvent.length > 1){
    //         console.log("There are duplicate IDs");
    //     }
    //     console.log(thisEvent);
    //     this.setState({targetEvent:thisEvent[0]})
    // }

    render() {
        console.log(this.state.targetEvent);
        return (
            <div className="Slide">
                <div className="main-container">
                    <div className="img-container">
                        <img className="main-img" src={this.state.targetEvent.imgSrc} alt={this.state.targetEvent.imgAlt} />
                    </div>
                    <div className="caption-container">
                        <h1 className="heading">{this.state.targetEvent.title}</h1>
                        <h3>{this.state.targetEvent.dateText}</h3>
                        <p>
                            {this.state.targetEvent.description}
                        </p>
                    </div>
                </div>
                <Gallery targetEvent={this.state.targetEvent}/>
            </div>
        )
    }
}