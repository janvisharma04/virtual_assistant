  import React, { createContext, useState } from 'react';
  import run from '../gemini';

  const dataContext = createContext();

  function UserContext({ children }) {
    const [speaking, setSpeaking] = useState(false);
    let [prompt,setPrompt]= useState("listening...")
    let [response,setResponse]=useState(false)
    

    function speak(text) {
      const text_speak = new SpeechSynthesisUtterance(text);
      text_speak.volume = 1;
      text_speak.rate = 1;
      text_speak.pitch = 1;
      text_speak.lang = "hi-GB";
      window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
  const text = await run(prompt);

  let newText = text
    .replace(/\*\*/g, "")  // remove bold markdown
    .replace(/\*/g, "")    // remove italic markdown
    .replace(/google/gi, "Janvi Sharma");

  setPrompt(newText);
  speak(newText);
  setResponse(true);

  setTimeout(() => {
    setSpeaking(false);
  }, 6000);
}


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (e) => {
      const transcript = e.results[e.resultIndex][0].transcript;
      setPrompt(transcript)
      takeCommand(transcript.toLowerCase())
    };
  function takeCommand(command) {
    command = command.toLowerCase();

    if (
      command.includes("your name") ||
      command.includes("who are you") ||
      command.includes("tell me your name")
    ) {
      speak("My name is Vexa, your virtual assistant.");
      setPrompt("My name is Vexa, your virtual assistant.");
    }

    
  // News
  else if (command.includes("news")) {
    const url = "https://news.google.com";
    speak("Opening latest news.");
    setPrompt("Opening Google News.");
    window.open(url, "_blank");
  }

  // Calculator fallback
  else if (command.startsWith("calculate") || command.match(/\d+[\s\+\-\*\/]+\d+/)) {
    aiResponse(command);
  }

  // OPEN commands
  else if (command.startsWith("open")) {
    const site = command.replace("open", "").trim();

    if (site === "calculator" || site === "cal") {
      speak("Sorry, I can't open system apps like Calculator from the browser.");
      setPrompt("Opening system apps like Calculator is not supported in browsers.");
    }

    else if (site === "youtube") {
      speak("Opening YouTube.");
      setPrompt("Opening YouTube.");
      window.open("https://www.youtube.com/", "_blank");
    }

      else {
        const formattedSite = site.replace(/\s+/g, "");
        const url = `https://${formattedSite}.com`;
        speak(`Opening ${site}`);
        setPrompt(`Opening ${site}`);
        window.open(url, "_blank");
      }
    }

    else if (command.includes("date")) {
      const date = new Date().toDateString();
      speak(`Today is ${date}`);
      setPrompt(`Today is ${date}`);
    }

    else if (command.includes("time")) {
      const time = new Date().toLocaleTimeString();
      speak(`The time is ${time}`);
      setPrompt(`The time is ${time}`);
    }

    else if (command.startsWith("search for")) {
      const query = command.replace("search for", "").trim();
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      speak(`Searching for ${query}`);
      setPrompt(`Searching for: ${query}`);
      window.open(url, "_blank");
    }

    else if (command.includes("weather")) {
      const url = `https://www.google.com/search?q=weather`;
      speak("Opening weather report.");
      setPrompt("Opening weather report.");
      window.open(url, "_blank");
    }

    else {
      aiResponse(command);
    }

    setTimeout(() => {
      setSpeaking(false);
    }, 6000);
  }



    const value = {
      recognition,
      speaking,
      setSpeaking,
      prompt,
      setPrompt,
      response,
      setResponse
    };

    return (
      <dataContext.Provider value={value}>
        {children}
      </dataContext.Provider>
    );
  }

  export { UserContext as default, dataContext };
