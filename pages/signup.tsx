import type { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import style from "../styles/Signup.module.scss"
import checkSignupInputs from "../utils/checkSignupInputs"

// Images
import editImage from "../assets/images/edit.png"

const Signup: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  //   const [showAlert, setShowAlert] = useState(false)
  //   const [alertMessage, setAlertMessage] = useState(null)

  //   function handleOnSubmit(formData) {
  //     formData.preventDefault()
  //     const data = { email, password, repeatPassword }
  //     const validationResult = checkSignupInputs(email, password, repeatPassword)

  //     if (!validationResult.status) {
  //       setShowAlert(true)
  //       setAlertMessage(validationResult.message)
  //       return
  //     }
  //   }

  return (
    <div id={`${style["signup-page"]}`}>
      <div id={`${style["signup-title-container"]}`}>
        <h2>Signup</h2>
      </div>
      <form onSubmit={() => {}}>
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
          <input
            type="password"
            name="repeat password"
            placeholder="repeat password"
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div id={`${style["form-button-container"]}`}>
          <button type="submit">
            <Image src={editImage} />
          </button>
        </div>
      </form>
      <Link href="/login" id={`${style["signup-link"]}`}>
        Non possiedi ancora un account? Registrati ora!
      </Link>
    </div>
  )
}

export default Signup
