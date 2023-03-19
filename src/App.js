import MainChat from './components/MainChat'
import React from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <div className="App">
      {/* <h1>WhatsApp Clone</h1> */}

      <div className="app__body">
        <Sidebar />
        <MainChat />
      </div>
    </div>
  )
}

export default App
