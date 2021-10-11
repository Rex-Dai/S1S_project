import React from 'react'

import PoIMarker from './PoIMarker';
import PoIPicture from "../Archieved/PictureFrame/Picture";

const PoICollection = (props) => {

    const eventData = require("./eventData.json")
    const eventList = [];

    const dateToCoordinate = (date) => {
        let x,y,z,year,month;

        try {
            date = new Date(date);
            year = date.getFullYear();
            month = date.getMonth();
        } catch (error) {
            console.error(error)
        }

        // todo need to decide the x axis mapping;
        x = ((-1) ^ ((month + year) % 2)) * (month + year) % 5;

        y = (year - 1914) * props.platformSettings.horizontalInterval +
            props.platformSettings.horizontalStartCoordinate +
            month * props.platformSettings.monthInterval;

        //todo need to decide the mapping of event at z axis
        z = 0;
        return [x,y,z];
    }



    // this is what renders
    // eventData.events.forEach( element => {
    //     let coordinate = dateToCoordinate(element.date)
    //         eventList.push(<EventSphere
    //         coords={coordinate}
    //         category={element.category}
    //         key={"" + element.date + element.category}
    //     />)
    // })


    return(
        <group>
            {eventList}
            <PoIMarker position={[0,0,0]} targetCoords={[32,40,4]} duration={2000}/>
            <PoIPicture position={[30,40,5]}/>
        </group>
    )
}

export default PoICollection;