// This is the object to display detailed PoI album
import React, {useLayoutEffect, useMemo, useState} from "react";
import * as THREE from "three";



const PoIAlbum = (props) => {

    const loader = new THREE.TextureLoader();

    const [items, setItems] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false)

    const [index, setIndex] = useState(0);


    useLayoutEffect(() => {
        const databaseUrl = 'https://www.data.qld.gov.au/api/3/action/datastore_search';
        // make api call
        fetch(databaseUrl + '?q=' +props.event.databaseQuery + '&resource_id=' + props.event.databaseID)
            .then(res => res.json())
            .then(response =>{
                setItems(response.result.records);
                setIsLoaded(true)
            })
    }, [])


    /*
     U need allow CORS to run following code
     */

    const filteredPicTexture = useMemo(() => {
        return items.filter(element => {
            const date = new Date(element["Temporal"]);
            const eventDate = new Date(props.event["date"])
            return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth();
        }).map(item => {
            return  loader.load(item["Thumbnail image"], () => {
            });
        })
    }, [isLoaded])







    return (
        <mesh >
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={filteredPicTexture[0]}/>
        </mesh>
        )
}


export default PoIAlbum;