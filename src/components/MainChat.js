import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import './MainChat.css'
import firebase from 'firebase/compat/app'
import moment from 'moment'

const MainChat = () => {
  const [input, setInput] = useState('')
  const [seed, setSeed] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('Room Name')
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name))

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMesage = (e) => {
    e.preventDefault()

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }

  return (
    <div className="mainChat">
      <div className="chat__header">
        <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleTimeString()}
          </p>
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
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && 'chat__reciever'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            {message.timestamp && (
              <span className="chat__timestamp">
                {new Intl.DateTimeFormat('en-US', {
                  timeZone: 'America/Los_Angeles',
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(message.timestamp.toDate()))}
              </span>
            )}
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMesage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default MainChat
