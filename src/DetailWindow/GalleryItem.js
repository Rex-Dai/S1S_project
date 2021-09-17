import React from "react"


export default class GalleryItem extends React.Component{


    // it's gonna be given the json object from call later.
    render(){
        return(
        <figure>
            <img src={this.props.thumbnail} alt={this.props.imgAlt}/>
            <caption>

                <p class="small-caption">{this.props.title}
                </p>

                <p class="large-caption">{this.props.title}
                </p>

            </caption>
        </figure>
        )
    }
}