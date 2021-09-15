import Line from './Line'
import React from "react";

const LinePlatform = () => {

    let verticalStartCoordinate, verticalInterval, horizontalStartCoordinate, horizontalInterval;

    verticalStartCoordinate = -20;
    verticalInterval = 10;
    horizontalStartCoordinate = 20;
    horizontalInterval = 20;

    return (
        <group>
            <Line index={verticalStartCoordinate} type={'vertical'} />
            <Line index={verticalStartCoordinate + verticalInterval} type={'vertical'} />
            <Line index={verticalStartCoordinate + 2 * verticalInterval} type={'vertical'} />
            <Line index={verticalStartCoordinate + 3 * verticalInterval} type={'vertical'} />
            <Line index={verticalStartCoordinate + 4 * verticalInterval} type={'vertical'} />
            <Line index={horizontalStartCoordinate} type={'horizontal'} />
            <Line index={horizontalStartCoordinate + horizontalInterval} type={'horizontal'} />
            <Line index={horizontalStartCoordinate + 2 * horizontalInterval} type={'horizontal'} />
            <Line index={horizontalStartCoordinate + 3 * horizontalInterval} type={'horizontal'} />
            <Line index={horizontalStartCoordinate + 4 * horizontalInterval} type={'horizontal'} />
        </group>
    )

}

export default LinePlatform;