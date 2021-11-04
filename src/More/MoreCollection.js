import {EventContext, TimelineState} from "../Events/EventContext";
import tweenCamera from "../Events/CameraTravese";
import {useThree} from "@react-three/fiber";
import {AboutUs} from "./AboutUs";
import Birds from "./Birds";
import {useContext, Suspense} from "react";
import {MoreButton} from "./MoreButton";


const MoreCollection = (props) => {

    const { eventState, timelinePos, setAmbientIntensity, setEventState} = useContext(EventContext)

    const birdPosition = [10,170,-162];

    const { camera } = useThree();

    const manageTraverseBackAtBird = () => {
        if (eventState === TimelineState.BIRD) {
            setAmbientIntensity(0.15)
            setEventState(TimelineState.DISABLED)
            tweenCamera(camera, [timelinePos.x, timelinePos.y, timelinePos.z], "toTimeline",
                () => {
                    setEventState(TimelineState.TIMELINE)
                },  2500)
        } else if (eventState === TimelineState.INFO) {
            setEventState(TimelineState.BIRD)
            tweenCamera(camera, birdPosition, "bird", () => {
                // display the about us html
                // random number to stop triggering other posters
            }, 1500);
        }
    }

    return (
        <>
            <group className={"handleVisibility"} visible={eventState === TimelineState.BIRD ||
            eventState === TimelineState.INFO}>
                <group className={"handleLabels"} onPointerMissed={manageTraverseBackAtBird} >
                    <AboutUs birdPosition={birdPosition}/>
                </group>
                <Suspense fallback={null}>
                    <mesh className={"handleBirdsPositions"} position={birdPosition}>
                        <Birds />
                    </mesh>
                </Suspense>
            </group>
            <MoreButton birdPosition={birdPosition} />
        </>
    )
}

export  default  MoreCollection;