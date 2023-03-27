import MainChat from './components/MainChat'
import React, { useState } from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { BrowserRouter as Routes, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './components/Login'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Routes>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <MainChat />
              </Route>
              <Route path="/">
                <MainChat />
              </Route>
            </Switch>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
