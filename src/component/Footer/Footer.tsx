
import React from 'react'
import styles from "./footer.module.scss";
export default function Footer() {
    return (
        <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span>© 2024 DeadBox. All Rights Reserved.</span>
      </div>
      <div className={styles.footerRight}>
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
    )
}