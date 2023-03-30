import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Chat } from '@mui/icons-material'
import db from '../firebase'
import './AddNewChat.css'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)
  const [roomName, setRoomName] = React.useState('')

  const handleTextInputChange = (e) => {
    setRoomName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const createChat = () => {
    if (roomName) {
      // do some clever db stuff...
      db.collection('rooms').add({
        name: roomName,
      })
    }
    setOpen(false)
    setRoomName('')
  }

  return (
    <div>
      <Chat variant="outlined" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        className="addNewChat__modal"
        PaperProps={{
          sx: { position: 'absolute', display: 'flex', width: '33%' },
        }}
      >
        <DialogTitle>Add new Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter name for chat</DialogContentText>
          <TextField
            autoFocus
            value={roomName}
            onChange={handleTextInputChange}
            margin="dense"
            id="name"
            label="New Chat name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createChat}>Add new Chat</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
