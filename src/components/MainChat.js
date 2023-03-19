import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './MainChat.css'

const MainChat = () => {
  const [seed, setSeed] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  return (
    <div className="mainChat">
      <div className="chat__header">
        <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message chat__reciever">
          <span className="chat__name">Nurlan</span>Hey Guys
          <span className="chat__timestapm">3:52pm</span>
        </p>
        <p className="chat__message">Hey Guys</p>
        <p className="chat__message">Hey Guys</p>
      </div>
      <div className="chat__footer"></div>
    </div>
  )
}

export default MainChat
