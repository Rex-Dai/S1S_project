import React, {useMemo, useCallback, useRef} from 'react'
import * as THREE from 'three'
import { MeshLambertMaterial } from 'three';

const Line = (props) => {
    const ref = useRef();

    let x_start, y_start, x_end, y_end = 0;

    if (props.type === 'vertical') {
        x_start = props.index;
        x_end = props.index;
        y_start = 0;
        y_end = 200;
    }

    if (props.type === 'horizontal') {
        x_start = -36;
        x_end = 36;
        y_start = props.index;
        y_end = props.index;
    }

    if (props.type === 'monthIndicator') {
        let month = props.index % 100 - 1, year = props.index / 100;
        if (month === 5) {
            x_start = props.platformSetting.verticalStartCoordinate - 3;
        } else {
            x_start = props.platformSetting.verticalStartCoordinate - 1.5;
        }
        x_end = props.platformSetting.verticalStartCoordinate;
        y_start = y_end = props.platformSetting.horizontalStartCoordinate
            + (year - 14) * props.platformSetting.horizontalInterval +
            props.platformSetting.monthInterval * month;
    }

    const points = useMemo(() =>
        [new THREE.Vector3(x_start, y_start, -5), new THREE.Vector3(x_end, y_end, -5)], []);
    const onUpdate = useCallback(self => self.setFromPoints(points), [points]);

    return (
        <line position={[0, 0, -10]} ref={ref}>
            <bufferGeometry attach="geometry" onUpdate={onUpdate}/>
            <lineBasicMaterial attach="material" color={'#ffffff'} linewidth={10} linecap={'round'} linejoin={'round'}/>
            {/* <meshLambertMaterial attach="material" emissive={'#ffffff'}/> */}
        </line>
    )
}

export default Line;