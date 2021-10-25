// this is the context file for textures and models
import React from "react"

// event context used to manage the 'state' that allows different interactions
// timeline: user can scroll timeline, click PoI objects to zoom in
// poi: user can click empty space to go back, click gallery to change photo
// zoomed: user can scroll to move around the poi texture
// disabled: disable all events

export const ModelContext = React.createContext({
    
    globeTexture: null,
    australiaTexture: null,
    frameModel: null

})
