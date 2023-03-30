import { MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import AddNewChat from './AddNewChat'

export const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
  }, [])

  useEffect(() => {
    setFilteredContacts(
      rooms.filter((room) =>
        room.data.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, rooms])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <AddNewChat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search chat name"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {filteredContacts.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}
