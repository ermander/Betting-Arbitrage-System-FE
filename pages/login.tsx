import type { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import style from "../styles/Login.module.scss"

// Images
import lockImage from "../assets/images/lock.png"
import rigthToBracketImage from "../assets/images/right-to-bracket-solid.svg"

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleOnSubmit() {}

  return (
    <div id={`${style["login-page"]}`}>
      <div id={`${style["login-title-container"]}`}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div id={`${style["form-inputs-container"]}`}>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id={`${style["form-button-container"]}`}>
          <button type="submit">
            <Image src={lockImage} />
          </button>
        </div>
      </form>
      <Link href="/signup" id={`${style["signup-link"]}`}>
        Non possiedi ancora un account? Registrati ora!
      </Link>
    </div>
  )
}

export default Login
