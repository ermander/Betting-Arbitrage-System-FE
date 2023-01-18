import type { NextPage } from "next"
import styles from "../styles/Login.module.scss"

const Login: NextPage = () => {
  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <h1 className={styles.title}>Matched Betting</h1>
        <h1 className={styles.title}>Managment System</h1>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>Login</h1>
        <h2 className={styles.subtitle}>
          Accedi al tuo account per usare il gestionale
        </h2>
        <div className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Inserisci la tua email..."
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Inserisci la tua password..."
          />

          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
