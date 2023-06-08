import { useState, useEffect } from "react";
import TimeOverPopup from "./components/TimeOverPopup";
import CountDown from "./components/CountDown";
import WordData from "./components/WordData";
import Statistics from "./components/Statistics";
import InputField from "./components/InputField";
import Data from "./Data";

const SECONDS = 3; // 5 minutes

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (minutes < 1) {
    return `${seconds} sec`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")} min`;
}

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    var ran = Math.floor(Math.random() * Data.length);
    setWords(Data[ran]);

    
  }, []);

  function start() {
    var ran = Math.floor(Math.random() * Data.length);
    setWords(Data[ran]);
    setCurrWordIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setStatus("started");
    setCountDown(SECONDS);

    let interval = setInterval(() => {
      setCountDown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          setStatus("finished");
          setCurrInput("");
          return SECONDS;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);
  }

  

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrCharIndex(-1);

      if (currWordIndex === words.length - 1) {
        // Reached the end of the current array
        const nextIndex = (Data.indexOf(words) + 1) % Data.length; // Get the index of the next array in a circular manner
        setWords(Data[nextIndex]);
        setCurrWordIndex(0);
      } else {
        setCurrWordIndex(currWordIndex + 1);
      }
    }
    // backspace
    else if (keyCode === 8) {
      setCurrCharIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      setCurrChar("");
    } else {
      setCurrCharIndex((prevIndex) => prevIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "success";
      } else {
        return "error";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "error";
    } else {
      return "";
    }
  }

  const formattedTime = formatTime(countDown);

  let wpm = 0;
  const minutes = SECONDS / 60;
  wpm = Math.round(correct / minutes);

  const handleRestart = () => {
    setStatus("waiting");
    setCountDown(SECONDS);
    setCorrect(0);
    wpm = 0;
  };

  return (
    <div
      className="maindiv"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#5D5C61",

        display: "flex",
      }}
    >
      <style>
        {`
      .success{
        background-color: green;
        
      }
      .error{
        background-color: red;
      }
     `}
      </style>

      <div
        className="row-d1"
        style={{
          flexGrow: 1,
          // backgroundColor: "rgb(96 221 187 / 84%)",
          backgroundColor: "#557A95",
          boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)",
          margin: 20,
          display: "flex",
          borderRadius: 10,
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >
        <h1
          style={{
            color: "#fcba03",
            display: "flex",
            justifyContent: "center",
            fontFamily: "sans-serif",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          Typing Pro
        </h1>
        <div>
          {status === "finished" && (
            <TimeOverPopup handlerestart={handleRestart} />
          )}
          <CountDown timer={formattedTime} />
        </div>
        <div
          style={{
            backgroundColor: "#B1A296",
            marginTop: 40,
            fontSize: 50,
            fontWeight: 500,
            marginBottom: 20,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "30%",
            alignItems: "center",
            boxShadow: "1px 2px 3px 4px rgba(100,100,100,0.4)",
            color:"#242423",
          }}
        >
          <WordData words={words} getCharClass={getCharClass} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputField
            status={status}
            start={start}
            handleKeyDown={handleKeyDown}
            currInput={currInput}
            setCurrInput={setCurrInput}
          />
        </div>
      </div>
      <div
        className="row-d2"
        style={{
          flexGrow: 0,

          width: 300,
          margin: 20,

          borderRadius: 10,
        }}
      >
        <Statistics wpm={wpm} correct={correct} incorrect={incorrect} />
      </div>
    </div>
  );
}

export default App;
