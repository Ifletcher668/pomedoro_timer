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
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button id="break-increment" onClick={incrementBreakLengthByOneMinute}> + </button>
            <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}> - </button>
        </div>
    ); 
}

export default Break;


