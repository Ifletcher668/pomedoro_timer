import moment from 'moment'
import React from 'react'

type Props = {
    breakLength: number
    incrementBreakLengthByOneMinute: () => void
    decrementBreakLengthByOneMinute: () => void
}

const Break:React.FC<Props> =({
    breakLength,
    incrementBreakLengthByOneMinute,
    decrementBreakLengthByOneMinute,

}) => { 
    
    const breakLengthInMinutes:number = moment
        .duration(breakLength, 's')
        .asMinutes();

    return (
        <div className="timer-components">
            <h3 id="break-label">Break</h3>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button id="break-increment" className="btn btn-primary" onClick={incrementBreakLengthByOneMinute}> + </button>
            <button id="break-decrement" className="btn btn-secondary" onClick={decrementBreakLengthByOneMinute}> - </button>
        </div>
    ); 
}

export default Break;


