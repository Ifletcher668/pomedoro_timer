import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { } from "react";

type Props = {
    timeLeft: number
    timerLabel: string
    handleStartStopClick: () => void
    handleResetButton: () => void
    startStopButtonLabel:string
}

momentDurationFormatSetup(moment);


const Timer:React.FC<Props> = ({ 
    timeLeft, 
    timerLabel, 
    handleStartStopClick, 
    startStopButtonLabel,
    handleResetButton
} ) => {
    const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss", {trim: false});
    
    return (
        <div className="timer-components">
            <h3 id="timer-label">{timerLabel}</h3>
            <p id="time-left">{formattedTimeLeft}</p>
            <button className="btn btn-primary" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
            <button className="btn btn-secondary" id="reset" onClick={handleResetButton}>Reset</button>
        </div>
    );
};

export default Timer;
