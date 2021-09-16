import React, {useMemo, useCallback, useRef} from 'react'
import * as THREE from 'three'

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
            x_start = -23;
        } else {
            x_start = -21.5;
        }
        x_end = -20;
        y_start = 20 + (year - 14) * 26 + month * 2;
        y_end = 20 + (year - 14) * 26 + month * 2;
    }

    const points = useMemo(() =>
        [new THREE.Vector3(x_start, y_start, -5), new THREE.Vector3(x_end, y_end, -5)], []);
    const onUpdate = useCallback(self => self.setFromPoints(points), [points]);

    return (
        <line position={[0, 0, -10]} ref={ref}>
            <bufferGeometry attach="geometry" onUpdate={onUpdate}/>
            <lineBasicMaterial attach="material" color={'#ffffff'} linewidth={10} linecap={'round'} linejoin={'round'}/>
        </line>
    )
}

export default Line;