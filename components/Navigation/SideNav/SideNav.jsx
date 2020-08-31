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
    console.log(props)

    if (props.type == "user") {
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
                <animated.aside className={classnames(styles.sideNav)} style={{ width: transition.width }} >
                    <ul className={classnames(styles.navDecoration, { [styles.hideElement]: toggle })}>
                        <li>
                            {data ? <img src={"https://cdn.discordapp.com/avatars/" + data.id + "/" + data.avatar + ".jpg?size=128"} width="96" height="96" alt="Logo" className={styles.image} /> :
                                <img src="https://receptioni.st/img/Logo-3.png" width="96" height="96" alt="Logo" className={styles.image} />
                            }
                        </li>
                        <li>
                            {data ? <h2>{data.username + "#" + data.discriminator}</h2> : <h2>Loading...</h2>}
                        </li>
                    </ul>
                    <ul className={classnames(styles.navDecoration, { [styles.hideElement]: toggle })}>
                        <li className={styles.buttons}><a className={styles.aCenter}>Dashboard</a></li>
                        <li className={styles.buttons}><a className={styles.aCenter}>Subscriptions</a></li>
                    </ul>
                    <ul className={classnames(styles.bottomFlex, { [styles.hideElement]: toggle })}>
                        <li className={styles.buttons}><a className={styles.aCenter}>Log Out</a></li>
                    </ul>
                </animated.aside>
                <section>
                    <div>
                        <GrMenu size="40" className={styles.hide} onClick={() => setToggle(!toggle)} />
                        <h1 style={{ margin: 5 }}>Your Servers:</h1>
                    </div>
                    {props.children}
                </section>
            </>
        )
    } else if (props.type == "server") {
        return (
            <>
                <animated.aside className={classnames(styles.sideNav)} style={{ width: transition.width }} >
                    <ul className={classnames(styles.navDecoration, { [styles.hideElement]: toggle })}>
                        <li>
                            {props.guildData.icons ? <img src={"https://cdn.discordapp.com/icons/" + props.guildData.id + "/" + props.guildData.icon + ".webp?size=256"} width="96" height="96" alt="Logo" className={styles.image} /> :
                                <img src="https://receptioni.st/img/Logo-3.png" width="96" height="96" alt="Logo" className={styles.image} />
                            }
                        </li>
                        <li>
                            {props.guildData ? <h2>{props.guildData.name}</h2> : <h2>Loading...</h2>}
                        </li>
                    </ul>
                    <ul className={classnames(styles.navDecoration, { [styles.hideElement]: toggle })}>
                        <li className={styles.buttons}><a className={styles.aCenter}>General</a></li>
                        <li className={styles.buttons}><a className={styles.aCenter}>Applications</a></li>
                        <li className={styles.buttons}><a className={styles.aCenter}>Submissions</a></li>

                    </ul>
                    <ul className={classnames(styles.bottomFlex, { [styles.hideElement]: toggle })}>
                        <li className={styles.buttons}><a className={styles.aCenter}>Log Out</a></li>
                    </ul>
                </animated.aside>
                <section>
                    <div>
                        <GrMenu size="40" className={styles.hide} onClick={() => setToggle(!toggle)} />
                        <h1 style={{ margin: 5 }}>Your Servers:</h1>
                    </div>
                    {props.children}
                </section>
            </>
        )
    } else if (props.type == "loading") {
        return (
            < Column size="1" >
                <img src="https://receptioni.st/img/ReceptionistLoadingScreen.gif" alt="Loading Gif" width="256" height="256" style={{ margin: "auto" }} />
            </Column >
        )
    }
}
