import { useState, useEffect, useRef } from 'react';
import { SpeechBubble } from './components/SpeechBubble';

import './App.css';

function App() {
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [alert, setAlert] = useState("")

  let bottomRef = useRef(null)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [text]);

  useEffect(() => {
    const sessionName = sessionStorage.getItem("name")
    if(sessionName) setName(sessionName)
  }, [text]);

  useEffect(() => {
    if (name !== '') {

      const names = localStorage.getItem("names")
      const userName = sessionStorage.getItem("name")
      
    if(!userName) {
      if(names) {
        if(names.includes(name.toLowerCase())) {
          setName('')
          setAlert(`${name} already exists`)
          return
        }

        let namesArr = JSON.parse(names)
        namesArr.push(name.toLowerCase())
        localStorage.setItem("names", JSON.stringify(namesArr))
      } else {
        localStorage.setItem("names", JSON.stringify([name.toLowerCase()]))
      }
      sessionStorage.setItem("name", name)
    }
  }
  }, [name]);

  const handleSubmit = () => {
    setAlert("")
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
          {/* sample */}
          <SpeechBubble 
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
            />
          <div ref={bottomRef}></div>
        </div>
          {alert && <p className='red-text'>{alert}</p>}
          <div className='chat-controls'>
            <input 
              type='text'
              value={text}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setAlert("")
                setText(e.target.value)
              }}
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
