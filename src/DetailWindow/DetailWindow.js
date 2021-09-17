import React from "react";
import Gallery from "./Gallery";


export class DetailWindow extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            targetEvent:null,
        }
    }
    
    componentDidMount(){
        // get the state of this component.
        const eventList = require("../Events/eventData.json")
        // get the target event based on id
        const thisEvent = eventList.events.filter(element => element.id === this.props.id )
        if(thisEvent.length > 1){
            console.log("There are duplicate IDs");
        }
        this.setState({targetEvent:thisEvent[0]})
    }

    render() {
        return (
            <div class="Slide">
                <div class="main-container">
                    <div class="img-container">
                        <img class="main-img" src={this.state.targetEvent.imgSrc} alt={this.state.targetEvent.imgAlt} />
                    </div>
                    <div class="caption-container">
                        <h1 class="heading">{this.state.targetEvent.title}</h1>
                        <h3>{this.state.targetEvent.dateText}</h3>
                        <p>
                            {this.state.targetEvent.description}
                        </p>
                    </div>
                </div>
                <Gallery />
            </div>
        )
    }
}