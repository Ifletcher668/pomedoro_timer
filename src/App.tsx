import React, { useState, useEffect } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import Timer from "./components/Timer";
import "./App.css";

const App = (props:any, prevState:any) => {
    // react hooks to use state, much like the state object in react class components
    // adding session state to app state, to be passed into Session component
    // adding break component state to app state, to be passed into Break component
    const [sessionLength, setSessionLength] = useState(1500);
    const [breakLength, setBreakLength] = useState(300);
    const [currentSessionType, setCurrentSessionType] = useState<string>("Session"); // will always be either Session or Break 
    const [intervalId, setIntervalId] = useState< NodeJS.Timeout | undefined | null>(null); 
    const [timeLeft, setTimeLeft] = useState<number | undefined>(sessionLength);

    // functions to handle sessions
    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength: number = sessionLength - 60;
        if (newSessionLength > 0) {
            setSessionLength(newSessionLength);
        }
    };

    const incrementSessionLengthByOneMinute = () => {
        const newSessionLength: number = sessionLength + 60;
        if (newSessionLength <= 3600) {
            setSessionLength(newSessionLength);
        }
    };

    // functions to handle breaks
    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength: number = breakLength - 60;
        if (newBreakLength > 0) {
            setBreakLength(newBreakLength);
        }
    };

    const incrementBreakLengthByOneMinute = () => {
        const newBreakLength: number = breakLength + 60;
        if (newBreakLength <= 3600) {
            setBreakLength(newBreakLength);
        }
    };


    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    const isStarted:boolean = intervalId !== null; 
    const handleStartStopClick = () => {
        if (isStarted) {
            // if we are in started mode:
            // we want to stop the timer
            // clearInterval method
            
            // typecasting intervalId to undefined, because clearInterval accepts either type number or type undefined
            clearInterval(intervalId as undefined)
            // setting intervalId back to null, so the function can properly run. 
            setIntervalId(null);
            
        }
        else {  // if we are in stopped mode:
            // decrement timeleft by one every second (100ms)
            // to do this, we'll use setInterval function
            const newIntervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    const newTimeLeft:number = (prevTimeLeft as number) - 1;
                    if (newTimeLeft >= 0) {
                        return newTimeLeft; 
                    }

                    if (currentSessionType === "Session") {

                        setCurrentSessionType("Break"); 

                        return breakLength; 
                    }
                    else if (currentSessionType === "Break") {

                        setCurrentSessionType("Session");

                        return sessionLength; 
                    }
                }) 
            }, 10); // TODO sadf asdf 
            setIntervalId(newIntervalId); 
        }
    };
    return (
        <div className="App-header">
            <Break
                breakLength={breakLength}
                decrementBreakLengthByOneMinute={
                    decrementBreakLengthByOneMinute
                }
                incrementBreakLengthByOneMinute={
                    incrementBreakLengthByOneMinute
                }
            />
            <Timer 
                sessionLength={sessionLength} 
                breakLength={breakLength}
                timerLabel={currentSessionType}
                handleStartStopClick={handleStartStopClick}
                startStopButtonLabel={isStarted? "Stop": "Start"}
                timeLeft={timeLeft}
            />
            <Session
                sessionLength={sessionLength}
                decrementSessionLengthByOneMinute={
                    decrementSessionLengthByOneMinute
                }
                incrementSessionLengthByOneMinute={
                    incrementSessionLengthByOneMinute
                }
            />
        </div>
    );
}

export default App;
