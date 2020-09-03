import React, { useState, useEffect } from "react"
import { FaDoorOpen } from "react-icons/fa";
import { GrMenu } from 'react-icons/gr'
import classnames from "classnames"
import styles from "./TopNav.module.css"

export default () => {
    const [toggle, setToggle] = useState(true);

    return (
        <header>
            <nav className={styles.nav}>
                <ul className={styles.left}>
                    <li>
                        <img src="https://receptioni.st/img/Logo-3.png" width="64" heig6ht="64" alt="Logo" className={styles.img} />
                    </li>
                    <GrMenu size="40" className={styles.hide} onClick={() => setToggle(!toggle)} />
                    <li className={classnames(styles.navLink, { [styles.hideNav]: toggle })}>
                        <a href="/commands" className={styles.navDecoration}>Commands</a>
                    </li>
                    <li className={classnames(styles.navLink, { [styles.hideNav]: toggle })}>
                        <a href="/premium" className={styles.navDecoration}>Premium</a>
                    </li>
                    <li className={classnames(styles.navLink, { [styles.hideNav]: toggle })}>
                        <a href="/invite" className={styles.navDecoration}>Invite</a>
                    </li>
                    <li className={classnames(styles.navLink, { [styles.hideNav]: toggle })}>
                        <a href="/support" className={styles.navDecoration}>Support</a>
                    </li>
                </ul>
                <ul className={styles.right}>
                    <li>
                        {toggle ? <a href="/api/login" className={styles.navLinkLogin}>Sign In <FaDoorOpen size="16" /></a> :
                            <a href="/api/login" className={styles.navLinkLogin}><FaDoorOpen size="20" /> </a>}
                    </li>
                </ul>
            </nav>
        </header >
    )
}