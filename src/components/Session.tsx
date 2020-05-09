import moment from 'moment'
import React from 'react'



type Props = {
    sessionLength: number;
    decrementSessionLengthByOneMinute: () => void;
    incrementSessionLengthByOneMinute: () => void;
}

const Session: React.FC<Props> = ({
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
}) => { 

    const sessionLengthInMinutes: number = moment
        .duration(sessionLength, "s")
        .asMinutes();

    return (
        <div className="timer-components">
            <h3 id="session-label">Focus</h3>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button id="session-increment" className="btn btn-primary" onClick={incrementSessionLengthByOneMinute}> + </button>
            <button id="session-decrement" className="btn btn-secondary" onClick={decrementSessionLengthByOneMinute}> - </button>
        </div>
    ); 
}

export default Session;