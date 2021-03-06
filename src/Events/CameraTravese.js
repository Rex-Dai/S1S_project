import * as THREE from "three";
import {useMemo} from "react";

const TWEEN = require('@tweenjs/tween.js');


export default function tweenCamera(camera, targetCoords, type, finishCallback, duration = 1000) {


    // offset for traversal towards the poster
    const posterPosOffset = [0, -5.5, 0]
    const zoomInPosOffset = [2.1, -4, 1.2]
    const zoomInTargetOffset = [2.1, 0, 1.2]
    const birdOffset = [0, 25, 20]
    const cameraCurrentPos = new THREE.Vector3().copy(camera.position);
    const cameraTargetPos = new THREE.Vector3(
        targetCoords[0],
        targetCoords[1],
        targetCoords[2]);
    //const cameraAngle = new THREE.Vector3().copy( camera.rotation );
    const targetObjectPos = new THREE.Vector3(
        targetCoords[0],
        targetCoords[1],
        targetCoords[2]);


    // obtain current and target quaternion
    // is this the best way???
    const cameraCurrentQuat = new THREE.Quaternion().copy(camera.quaternion);
    let cameraTargetQuat;
    if (type === "toTimeline") {

        // for going back to timeline
        camera.position.set(0, -10, 5)
        targetObjectPos.set(0, 5, 0)

    } else if (type === "poiZoomIn") {

        cameraTargetPos.set(
            targetCoords[0] + zoomInPosOffset[0],
            targetCoords[1] + zoomInPosOffset[1],
            targetCoords[2] + zoomInPosOffset[2])
        // target object stays same

        targetObjectPos.set(
            targetCoords[0] + zoomInTargetOffset[0],
            targetCoords[1] + zoomInTargetOffset[1],
            targetCoords[2] + zoomInTargetOffset[2])
        camera.position.copy(cameraTargetPos)
    } else if (type === "bird") {


        cameraTargetPos.set(
            targetCoords[0] + birdOffset[0],
            targetCoords[1] + birdOffset[1],
            targetCoords[2] + birdOffset[2])

        targetObjectPos.set(
            targetCoords[0],
            targetCoords[1],
            targetCoords[2])

        camera.position.copy(cameraTargetPos)

    } else {

        cameraTargetPos.set(
            targetCoords[0] + posterPosOffset[0],
            targetCoords[1] + posterPosOffset[1],
            targetCoords[2] + posterPosOffset[2])
        camera.position.copy(cameraTargetPos)
    }

    camera.lookAt(targetObjectPos)
    cameraTargetQuat = new THREE.Quaternion().copy(camera.quaternion);

    camera.position.copy(cameraCurrentPos);
    camera.quaternion.copy(cameraCurrentQuat)

    // this is the tween to interpolate the position
    let posTween = new TWEEN.Tween(cameraCurrentPos)
        .to(cameraTargetPos, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.copy(cameraCurrentPos);
            //camera.lookAt(targetObjectPos);
        })
        .onComplete(() => {
            camera.position.copy(cameraTargetPos);
            finishCallback();
            //camera.lookAt(targetObjectPos);
        })

    // this is the tween to interpolate camera angle
    // tried, but I think there's a better way
    let viewTween = new TWEEN.Tween(cameraCurrentQuat)
        .to(cameraTargetQuat, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => camera.quaternion.copy(cameraCurrentQuat))
        .onComplete(() => camera.quaternion.copy(cameraTargetQuat))



    posTween.start();
    viewTween.start();
}