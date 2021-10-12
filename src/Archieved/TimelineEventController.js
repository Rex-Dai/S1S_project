import { EventContext } from "../Events/EventContext";
import Scene from "../Scene";

// this is the file that stores event system
export const TimelineEventController = (props) => {
    
    const [appState, changeState] = useState("timeline");
    const value = {appState, changeState};
    return(
        <EventContext.Provider value={value}>
            
        </EventContext.Provider>
    );

}