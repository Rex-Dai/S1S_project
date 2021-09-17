import React from "react"
import GalleryItem from "./GalleryItem"

export default class Gallery extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            startIndex:0,

        }
    }

    componentDidMount(){
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        console.log(this.props.targetEvent);
        // make api call
        fetch(databaseUrl + '?q=' +this.props.targetEvent.databaseQuery + '&resource_id=' + this.props.targetEvent.databaseID)
        .then(res => res.json())
        .then(response =>{
            console.log(response)
            this.setState({
                isLoaded: true,
                items: response.result.records
            })
            console.log(this.state.items);
        })
    }
    
    render() {
        if(this.state.isLoaded){
            return (
                
                <div className="gallery-container">
                    <h2>Gallery</h2>
                    <div className="figure-container">
                        
                    <GalleryItem 
                    title={this.state.items[0]["Title of image"]} 
                    thumbnail={this.state.items[0]["Thumbnail image"]}/>
                    <GalleryItem 
                    title={this.state.items[1]["Title of image"]} 
                    thumbnail={this.state.items[1]["Thumbnail image"]}/>
                    <GalleryItem 
                    title={this.state.items[2]["Title of image"]} 
                    thumbnail={this.state.items[2]["Thumbnail image"]}/>
                    <GalleryItem 
                    title={this.state.items[3]["Title of image"]} 
                    thumbnail={this.state.items[3]["Thumbnail image"]}/>
                    <GalleryItem 
                    title={this.state.items[4]["Title of image"]} 
                    thumbnail={this.state.items[4]["Thumbnail image"]}/>
                    </div>
                </div>
            )
        } else{
            return(
                <div className="gallery-container">
                    <h2>Gallery</h2>
                    <div className="figure-container">
                        
                    </div>
                </div>

            )
        }
    }
}