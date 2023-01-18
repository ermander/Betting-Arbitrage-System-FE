import Link from "next/link"
import { useRouter } from "next/router"

// Styles
import styles from "../../styles/Layout.module.scss"

import { MdVerticalSplit } from "react-icons/md"

export default function Instruments() {
  const router = useRouter()

  return (
    <div className={styles.instruments}>
      <h2 className={styles.title}> Strumenti</h2>
      <div className={styles.instrumentsContainer}>
        <div
          className={styles.itemContainer}
          onClick={() => router.push("/oddsmatcher")}>
          <MdVerticalSplit color="white" className={styles.icon} />
          Oddsmatcher
        </div>
        <div
          className={styles.itemContainer}
          onClick={() => router.push("/dutcher")}>
          <MdVerticalSplit color="white" className={styles.icon} />
          Dutcher
        </div>
        <div
          className={styles.itemContainer}
          onClick={() => router.push("/trimatcher")}>
          <MdVerticalSplit color="white" className={styles.icon} />
          Trimatcher
        </div>
      </div>
    </div>
  )
}
