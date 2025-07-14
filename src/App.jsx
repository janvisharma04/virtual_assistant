import React, { useContext,useState } from "react";
import "./App.css";
import va from "./assets/ai.png";
import speakimg from "./assets/voice.gif";
import { FaMicrophoneAlt } from "react-icons/fa";
import { dataContext } from "./context/userContext";
import aigif from "./assets/aivoice.gif"

function App() {
  const { recognition, speaking, setSpeaking,prompt,response,setPrompt,setResponse } = useContext(dataContext);

  return (
    <div className="main">
      <img src={va} alt="" id="vexa" />
      <span>I'm Vexa, Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...")
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Click to Command<FaMicrophoneAlt />
        </button>
      ) : (
        <div className="response">
          {!response ?
          <img src={speakimg} alt="Speaking" id="speak" />
          : <img src={aigif} alt="" id="aigif" />
          }
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
