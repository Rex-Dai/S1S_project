import * as THREE from "three";
import {useThree} from "@react-three/fiber";

const TWEEN = require('@tweenjs/tween.js');


export default function tweenCamera(camera, targetCoords, duration, timelineView = false) {

    const cameraOffset = [0,-5,0];
    const cameraCurrentPos = new THREE.Vector3().copy( camera.position );
    const cameraTargetPos = new THREE.Vector3(
        targetCoords[0] + cameraOffset[0],
        targetCoords[1] + cameraOffset[1],
        targetCoords[2] + cameraOffset[2]);
//const cameraAngle = new THREE.Vector3().copy( camera.rotation );
    const targetObjectPos = new THREE.Vector3(targetCoords[0], targetCoords[1], targetCoords[2]);

// obtain current and target quaternion
// is this the best way???
    const cameraCurrentQuat = new THREE.Quaternion().copy(camera.quaternion);
    let cameraTargetQuat;
    if (!timelineView) {
        camera.position.copy(cameraTargetPos);
        camera.lookAt(targetObjectPos);
        cameraTargetQuat = new THREE.Quaternion().copy(camera.quaternion);

    } else {
        camera.position.set(0, -10, 8)
        camera.lookAt(0,5,0)
        cameraTargetQuat = new THREE.Quaternion().copy(camera.quaternion);
    }
    camera.position.copy(cameraCurrentPos);
    camera.quaternion.copy(cameraCurrentQuat)

// this is the tween to interpolate the position
    let posTween = new TWEEN.Tween( cameraCurrentPos )
        .to( cameraTargetPos, duration )
        .easing( TWEEN.Easing.Quadratic.InOut )
        .onUpdate( () => {
            camera.position.copy( cameraCurrentPos );
            //camera.lookAt(targetObjectPos);
        })
        .onComplete( () => {
            camera.position.copy( cameraTargetPos );
            //camera.lookAt(targetObjectPos);
        })

// this is the tween to interpolate camera angle
// tried, but I think there's a better way
    let viewTween = new TWEEN.Tween( cameraCurrentQuat )
        .to( cameraTargetQuat, duration )
        .easing( TWEEN.Easing.Quadratic.InOut )
        .onUpdate( () => camera.quaternion.copy(cameraCurrentQuat))
        .onComplete(() => camera.quaternion.copy(cameraTargetQuat))

    posTween.start();
    viewTween.start();
}