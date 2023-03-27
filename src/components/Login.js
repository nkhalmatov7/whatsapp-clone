import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from '../firebase'
import './Login.css'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

const Login = () => {
  const [{}, dispatch] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
          alt="whatsapp__logo"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
