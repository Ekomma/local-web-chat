import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [text, setText] = useState("")

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
