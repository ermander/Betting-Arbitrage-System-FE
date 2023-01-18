// Components
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"

// Styles
import styles from "../styles/Layout.module.scss"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
