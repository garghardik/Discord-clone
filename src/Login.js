import { Button } from '@mui/material'
import React from 'react'
import "./Login.css"
import {auth,provider,signInWithPopup} from "./firebase"

function Login() {

    const signIn = () => {
        signInWithPopup(auth, provider).catch(error => alert(error.message));
      };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://www.proofhub.com/wp-content/uploads/2021/03/Discord-logo-1.png"
          alt="Discord Logo"
          height={`800px`}
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login