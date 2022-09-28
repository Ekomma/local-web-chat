import React from "react";

export const SpeechBubble = ({ dir, text, userName }) => {
    
  return (
    <div className={`speech-bubble ${dir === "left" ? "left" : "right"}`}>
     {userName && <div className={`avatar ${dir === "left" ? "avar-left" : "avar-right"}`}>
        {userName[0].toLocaleUpperCase()}
      </div>}
      <div
        className={`text ${dir === "left" ? "left-hook" : "right-hook"}`}
      >
        {text}
      </div>
    </div>
  );
};
