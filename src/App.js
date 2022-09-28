import { useState, useEffect, useRef } from "react";
import { SpeechBubble } from "./components/SpeechBubble";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState("");
  const [stateMessages, setStateMessages] = useState([]);

  let bottomRef = useRef(null);

  const getStoredMessages = () => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages?.length > 0)
      setStateMessages(JSON.parse(storedMessages));
  }

  useEffect(() => {
    const listernId = window.addEventListener(
      "storage",
      () => getStoredMessages()
    );

    return () => {
      window.removeEventListener("storage", listernId);
    };
  }, []);

  useEffect(() => {
    getStoredMessages()
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current.scrollTop = bottomRef.current?.scrollHeight;
  }, [text, stateMessages]);

  useEffect(() => {
    const sessionName = sessionStorage.getItem("name");
    if (sessionName) setName(sessionName);
  }, [text]);

  useEffect(() => {
    if (name !== "") {
      const names = localStorage.getItem("names");
      const userName = sessionStorage.getItem("name");

      if (!userName) {
        if (names) {
          if (names.includes(name.toLowerCase())) {
            setName("");
            setAlert(`${name} already exists`);
            return;
          }

          let namesArr = JSON.parse(names);
          namesArr.push(name.toLowerCase());
          localStorage.setItem("names", JSON.stringify(namesArr));
        } else {
          localStorage.setItem("names", JSON.stringify([name.toLowerCase()]));
        }
        sessionStorage.setItem("name", name);
      }
    }
  }, [name]);

  const storeMessage = (message) => {
    if (!name) {
      setAlert("Cannot store message without a user");
    }
    const messages = localStorage.getItem("messages");
    const newMessage = { message, name: name.toLowerCase() };
    if (messages) {
      const messagesArr = JSON.parse(messages);
      messagesArr.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(messagesArr));
    } else {
      localStorage.setItem(
        "messages",
        JSON.stringify([{ message, name: name.toLowerCase() }])
      );
    }
  };

  const handleSubmit = () => {
    setAlert("");
    const enteredText = text.trim();
    if (enteredText.length === 0) return;
    if (!name) {
      setName(enteredText);
      setText("");
      return;
    }
    storeMessage(enteredText);
    setText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="App">
      <h1 className="title">Simple Chat</h1>
      <main className="chatbox">
        <header className="App-header">
          Welcome to the chatbox <strong>{name.toLocaleUpperCase()}</strong>
        </header>
        <div className="chat-content" ref={bottomRef}>
          {stateMessages?.length > 0 &&
            stateMessages.map((message, idx) => (
              <SpeechBubble
                key={idx}
                dir={message.name === name.toLowerCase() ? "right" : "left"}
                text={message.message}
                userName={message.name}
              />
            ))}
        </div>
        {alert && <p className="red-text">{alert}</p>}
        <div className="chat-controls">
          <input
            type="text"
            value={text}
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setAlert("");
              setText(e.target.value);
            }}
            placeholder={!name ? "Enter your name" : "Enter your message"}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
