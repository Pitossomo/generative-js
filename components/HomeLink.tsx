import Link from "next/link"
import styles from '../styles/HomeLink.module.css' 

const HomeLink = () => (
  <Link className={styles.backlink} href='/'>⬅</Link>
)

export default HomeLink