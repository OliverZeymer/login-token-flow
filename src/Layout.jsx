import { Navigation } from "./components/global/Navigation"
import { Outlet, useLocation } from "react-router"
import { motion } from "framer-motion"
import styles from "./constants/styles"

export default function Layout() {
  const location = useLocation()

  return (
    <>
      <header className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
        <Navigation />
      </header>

      <motion.main
        key={location.pathname}
        className={`mx-auto px-6 my-6 lg:my-16 lg:px-16 xl:px-0 ${styles.boxWidth}`}
        initial={{ opacity: 0, y: 24 }}
        exit={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}>
        <Outlet />
      </motion.main>
    </>
  )
}
