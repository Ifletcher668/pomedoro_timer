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
    const [intervalId, setIntervalId] = useState< NodeJS.Timeout | null>(null); 
    const [timeLeft, setTimeLeft] = useState<number>(sessionLength);

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


    // useEffect is a builtin react hook that listens to any changes made to a variable 
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    //listen to timeLeft changes
    useEffect(() => {
        if (timeLeft === 0) {
            if (currentSessionType === "Session") {
                setCurrentSessionType("Break"); 
                setTimeLeft(breakLength)
            }
            else if (currentSessionType === "Break") {
                setCurrentSessionType("Session");
                setTimeLeft(sessionLength); 
            }
        }
        }, [breakLength, currentSessionType, sessionLength, timeLeft]); // known as a dependency array. Anything used in the callback of useEffect must be inside the dependency array 

    const isStarted:boolean = intervalId !== null; 
    const handleStartStopClick = () => {
        if (isStarted) {
            // if we are in started mode:
            // we want to stop the timer
            // clearInterval method
            if (intervalId) {
                clearInterval(intervalId)
            }
            // setting intervalId back to null, so the function can properly run. 
            setIntervalId(null);
        }
        else {  // in stopeed mode: 
            const newIntervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft -1 ) 
            }, 10); // TODO sadf asdf 
            setIntervalId(newIntervalId); 
        }
    };

    const handleResetButton = () => {
        // clear the timeout interval
        if (intervalId) {
            clearInterval(intervalId)
        } 
        // set the intervalId to null
        setIntervalId(null);  
        // set the currentSessionType to "Session"
        setCurrentSessionType("Session");
        // set the SessionLength to 25 minutes
        setSessionLength(1500); 
        // set the BreakLength to 25 minutes
        setBreakLength(300); 
        // set the TimeLeft to 25 minutes 
        setTimeLeft(1500)
    }
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
                timerLabel={currentSessionType}
                handleStartStopClick={handleStartStopClick}
                handleResetButton={handleResetButton}
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
