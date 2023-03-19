import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat')
    if (roomName) {
      // do some clever db stuff...
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
