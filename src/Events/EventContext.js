// this is the context file for event
import React from "react"

// event context used to manage the 'state' that allows different interactions
// timeline: user can scroll timeline, click PoI objects to zoom in
// poi: user can click empty space to go back, click gallery to change photo
// zoomed: user can scroll to move around the poi texture
// disabled: disable all events

export const EventContext = React.createContext({
    eventState: "timeline",
    setEventState: () => { }, // assigned by provider
    timelinePos: [0,0,0],
    setTimelinePos: () => {}
})

export const TimelineState = {
    TIMELINE: "timeline",
    PoI: "poi",
    ZOOM: "zoomed",
    DISABLED: "disabled"
}

