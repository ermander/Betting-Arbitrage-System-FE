// Styles
import styles from "../../styles/Layout.module.scss"

// Components
import Logo from "./Logo"
import Instruments from "./Instruments"

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Instruments />
    </div>
  )
}
