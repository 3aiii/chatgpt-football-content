import React, { useState, useEffect } from "react";

const SpeechToText = ({ setPromp }) => {
  const [isListening, setIsListening] = useState(false);

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "th-TH";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechTranscript = event.results[0][0].transcript;
      setPromp(speechTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div>
      <button
        className="bg-purple-500 hover:bg-purple-600 transition rounded-md text-white px-3 py-2"
        onClick={handleSpeechRecognition}
      >
        {isListening ? "กำลังฟัง..." : "🎤 เริ่มพูด"}
      </button>
    </div>
  );
};

export default SpeechToText;
