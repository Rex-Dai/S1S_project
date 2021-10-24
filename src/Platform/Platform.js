import Line from './Line'
import React, {useEffect, useState} from "react";
import TextLabel from "./TextLabel";


const Platform = (props) => {

    let verStart, verInt, horiStart, horiInt;

    verStart = props.platformSettings.verticalStartCoordinate;
    verInt = props.platformSettings.verticalInterval;
    horiStart = props.platformSettings.horizontalStartCoordinate;
    horiInt = props.platformSettings.horizontalInterval;

    const lineList = [];
    const indicator = [];
    const label = []


    // the index props for vertical line stands for the coordinate at x axis
    for (let i = 0; i < 5; i++) {
        lineList.push(<Line index={verStart +
        i * verInt} type={'vertical'} key={"ver" + i}/>);
    }

    // the index props for horizontal line stands for the y coordinate
    for (let i = 0; i < 6; i++) {
        lineList.push(<Line index={horiStart +
        i * horiInt} type={'horizontal'} key={"hor" + i}/>);
    }

    // the index props for monthIndicator stands for the year and month
    // e.g. index = 1402 will be interpreted as 02/1914, no additional indicator for Jan.
    for (let i = 14; i < 19; i++) {
        for (let j = 2; j < 13; j++) {
            indicator.push(<Line index={i * 100 + j} type={'monthIndicator'}
                                 platformSetting={props.platformSettings} key={100 * i + j}/>);
        }
        label.push(<TextLabel position={[verStart - 9,
            horiStart + (i - 14) * horiInt, -3]} text={(1900 + i).toString()}
                              key={i}/>)
    }
    label.push(<TextLabel position={[verStart - 9,
        horiStart + (19 - 14) * horiInt, -3]} text={(1900 + 19).toString()}
                          key="end"/>);

    return (
        <group>
            {lineList}
            {indicator}
            {label}
        </group>
    )

}

export default Platform;