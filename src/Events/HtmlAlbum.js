import {Html} from '@react-three/drei';
import React, {useLayoutEffect, useMemo, useState} from "react";

export const HtmlAlbum = (props) => {

    const shuffle = require("lodash/shuffle")

    // img index
    const [index, setIndex] = useState(0);
    // get image
    const [items, setItems] = useState([]);

    const [loaded, setLoaded] = useState(false)

    useLayoutEffect(() => {
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        // make api call
        console.log(JSON.stringify(props.event.databaseQuery))
        fetch(databaseUrl + '?q=' + JSON.stringify(props.event.databaseQuery) + '&resource_id=' +
            props.event.databaseID)
            .then(res => res.json())
            .then(response => {
                setItems(response.result.records);
                setLoaded(true)
            })
    }, [])


    const albumPics = useMemo(() => {
        return shuffle(items.filter(element => {
            /*
                filter by date
             */
            // let year, month;
            // if (element["temporal"]) {
            //     year = new Date(element["temporal"]).getFullYear() - 100;
            //     month = new Date(element["temporal"]).getMonth()
            // } else if (element["Temporal"]) {
            //     year = new Date(element["Temporal"]).getFullYear()
            // } else {
            //     throw new Error("non defined date")
            // }
            // const eventDate = new Date(props.event["date"])

            /*
             filter by valid http
             */
            return  element[props.event.imageField].startsWith('http')
        }).slice(0, 5)).map(item => {
            return [ "//images.weserv.nl/?url=" + item[props.event.imageField],
                item[props.event.contentField].replaceAll(",", "\n")];
        })
    }, [loaded])

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
