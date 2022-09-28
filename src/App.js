import { useState, useEffect, useRef } from 'react';
import './App.css';
import { SpeechBubble } from './components/SpeechBubble';

function App() {
  const [name, setName] = useState("")
  const [text, setText] = useState("")

  let bottomRef = useRef(null)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [text]);

  const handleSubmit = () => {
    const enteredText = text.trim()
    if (enteredText.length === 0) return 
      if (!name) {
        setName(enteredText)
        setText("")
        return
      }
      
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }
  return (
    <div className="App">
      <h1 className='title'>Simple Chat</h1>
      <main className='chatbox'>
        <header className='App-header'>
          Welcome to the chatbox <strong>{name.toLocaleUpperCase()}</strong>
        </header>
        <div className='chat-content'>
          {/* sample bubbles */}
          {/* <SpeechBubble 
            dir='left'
            text='Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?'
            userName={name}
          />
          <SpeechBubble 
            dir='right'
            text='Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?'
            userName={name}
          />
          <SpeechBubble 
            dir='left'
            text='Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you?'
            userName={name}
          /> */}
          <div ref={bottomRef}></div>
        </div>
          <div className='chat-controls'>
            <input 
              type='text'
              value={text}
              onKeyDown={handleKeyPress}
              onChange={(e) => setText(e.target.value)}
              placeholder={!name ? 'Enter your name': 'Enter your message'}
            />
            <button
            onClick={handleSubmit}
            >Send</button>
          </div>
      </main>
    </div>
  );
}

export default App;
