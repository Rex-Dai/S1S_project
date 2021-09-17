import React from "react"
import GalleryItem from "./GalleryItem"

export default class Gallery extends React.Component {

    render() {
        return (
            <div className="gallery-container">
                <h2>Gallery</h2>
                <div className="figure-container">
                <GalleryItem />
                <GalleryItem />
                <GalleryItem />
                <GalleryItem />
                <GalleryItem />
                </div>
            </div>
        )
    }
}