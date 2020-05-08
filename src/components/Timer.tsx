import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { } from "react";

momentDurationFormatSetup(moment);

const Timer = (props: any) => {
    const { 
        timeLeft, 
        timerLabel, 
        handleStartStopClick, 
        startStopButtonLabel 
    } = props;

    const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss", {trim: false});
    
    return (
        <div>
            <p id="timer-label">{timerLabel}</p>
            <p id="time-left">{formattedTimeLeft}</p>
            <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
        </div>
    );
};

export default Timer;
