import styles from "../../styles/Header.module.scss"

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </>
  )
}
