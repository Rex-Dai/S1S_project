import Line from './Line'
import React from "react";
import TextLabel from "./TextLabel";


const Platform = () => {

    let verticalStartCoordinate, verticalInterval, horizontalStartCoordinate, horizontalInterval;

    verticalStartCoordinate = -20;
    verticalInterval = 10;
    horizontalStartCoordinate = 20;
    horizontalInterval = 26;

    const lineList = [];
    const indicator = [];
    const label = []

    // the index props for vertical line stands for the coordinate at x axis
    for (let i = 0; i < 5; i++) {
        lineList.push(<Line index={verticalStartCoordinate +
        i * verticalInterval} type={'vertical'}/>);
    }

    // the index props for horizontal line stands for the y coordinate
    for (let i = 0; i < 6; i++) {
        lineList.push(<Line index={horizontalStartCoordinate +
        i * horizontalInterval} type={'horizontal'}/>);
    }

    // the index props for monthIndicator stands for the year and month
    // e.g. index = 1402 will be interpreted as 02/1914, no additional indicator for Jan.
    for (let i = 14; i < 19; i++) {
        for (let j = 2; j < 13; j++) {
            indicator.push(<Line index={i * 100 + j} type={'monthIndicator'}/>);
        }
        label.push(<TextLabel position={[verticalStartCoordinate - 15,
            horizontalStartCoordinate + (i - 14) * horizontalInterval, -18]} text={(1900 + i).toString()}/>)
    }
    label.push(<TextLabel position={[verticalStartCoordinate - 15,
        horizontalStartCoordinate + (19 - 14) * horizontalInterval, -18]} text={(1900 + 19).toString()}/>);


    return (
        <group>
            {lineList}
            {indicator}
            {label}
        </group>
    )

}

export default Platform;