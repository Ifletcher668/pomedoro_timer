import moment from 'moment'
import React from 'react'

const Session = (props:any) => { 

    const {
        sessionLength,
        decrementSessionLengthByOneMinute,
        incrementSessionLengthByOneMinute,
    } = props; 

    const sessionLengthInMinutes: number = moment
        .duration(sessionLength, "s")
        .asMinutes();
        
    return (
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button id="session-increment" onClick={incrementSessionLengthByOneMinute}> + </button>
            <button id="session-decrement" onClick={decrementSessionLengthByOneMinute}> - </button>
        </div>
    ); 
}

export default Session;