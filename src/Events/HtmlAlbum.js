import { Html } from '@react-three/drei';
import React, { useContext, useLayoutEffect, useState } from "react";
import { EventContext } from "./EventContext";
import './style.css'

export const HtmlAlbum = (props) => {

    // img index
    const [index, setIndex] = useState(0);
    // get image
    const { items, loaded } = useContext(EventContext);
    
    const albumPics = items.filter(element => {
        const date = new Date(element["Temporal"]);
        const eventDate = new Date(props.event["date"])
        return eventDate.getFullYear() === date.getFullYear() &&
            date.getMonth() >= eventDate.getMonth() - 4 &&
            date.getMonth() <= eventDate.getMonth() + 4
    }).slice(0, 3).map(item => {
        const subStr = item["Title of image"].replaceAll(",", "\n");
        return [item["High resolution image"], subStr];
    })

    // const albumPics = ["../Images/warPic.png", "../Images/warPic.png", "../Images/warPic.png", "../Images/warPic.png", "../Images/warPic.png"]
    // let variable = "none";
    // // just query the database and filter!
    // useLayoutEffect(() => {
    //     fetch('https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id='
    //         + props.event.databaseID + '&q=' + props.event.query)
    //         .then((res) => { 
    //             res.json().then((data) => {variable = data; console.log(variable)})
    //         })
    // }, [])
    // console.log(res)




    // console.log(filteredPic)
    return (
        <group position={props.position}>
            <Html className={props.visible}>
                <div className="album">
                    <img src={loaded ? albumPics[index][0] : "../Images/warPic.png"}
                        onClick={() => setIndex((index + 1) % albumPics.length)}
                    >

                    </img>
                    <h3 className="img-desc">
                        {loaded ? albumPics[index][1] : ""}
                    </h3>
                </div>
            </Html>
        </group>
    )
}
