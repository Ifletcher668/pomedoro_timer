import moment from 'moment'
import React from 'react'

const Break = (props:any) => { 
    const {
        breakLength,
        incrementBreakLengthByOneMinute,
        decrementBreakLengthByOneMinute,
    } = props


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


