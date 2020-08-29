import React, { useState, useEffect } from "react"
import { GrMenu } from 'react-icons/gr'
import { useSpring, animated } from 'react-spring';
import styles from "./sidenav.module.css"
import classnames from "classnames"
import axios from "axios"

export default (props) => {
    const [data, setData] = useState(null)
    const [toggle, setToggle] = useState(false)
    const transition = useSpring({
        width: toggle ? 0 : 200
    })

    console.log(transition)

    useEffect(() => {
        const getIdentify = async () => {
            let access = window.localStorage.getItem("access_token")
            let refresh = window.localStorage.getItem("refresh_token")

            axios.post("https://receptioni.st/api/users",
                {
                    access,
                    refresh
                }).then(data => {
                    setData(data.data)
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                        if (error.response.status == 401) {
                            window.location.href = "/api/login"
                        }
                    }

                })
            return null;
        }

        getIdentify();
    }, [])

    return (
        <>
            <animated.aside className={classnames(styles.sideNav)} styles={{ width: transition.width.value }} >
                <ul className={classnames(styles.navDecoration)}>
                    <li>
                        {data ? <img src={"https://cdn.discordapp.com/avatars/" + data.id + "/" + data.avatar + ".jpg?size=128"} width="96" height="96" alt="Logo" className={styles.image} /> :
                            <img src="https://receptioni.st/img/Logo-3.png" width="96" height="96" alt="Logo" className={styles.image} />
                        }
                    </li>
                    <li>
                        {data ? <h2>{data.username + "#" + data.discriminator}</h2> : <h2>Loading...</h2>}
                    </li>
                </ul>
                <ul className={classnames(styles.navDecoration)}>
                    <li className={styles.buttons}><a className={styles.aCenter}>Dashboard</a></li>
                    <li className={styles.buttons}><a className={styles.aCenter}>Subscriptions</a></li>
                </ul>
                <ul className={classnames(styles.bottomFlex)}>
                    <li className={styles.buttons}><a className={styles.aCenter}>Log Out</a></li>
                </ul>
            </animated.aside>
            <section>
                <div>
                    <GrMenu size="40" className={styles.hide} onClick={() => setToggle(!toggle)} />
                </div>
                {props.children}
            </section>
        </>
    )
}