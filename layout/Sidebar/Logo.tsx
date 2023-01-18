import Image from "next/image"

// Styles
import styles from "../../styles/Layout.module.scss"

export default function Sidebar() {
  return (
    <div className={styles.sidebarLogoContainer}>
      <Image
        src={require("../../assets/images/balance.png")}
        alt="Logo"
        width={50}
        height={50}
        className={styles.sidebarLogo}
      />
      <span className={styles.sidebarLogoText}>
        <p className={styles.title}>Matched Betting</p>
        <p className={styles.title}>Managment System</p>
      </span>
    </div>
  )
}
