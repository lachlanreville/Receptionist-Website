import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import styles from "./applications.module.css"

export default (props) => {
    const [serverData, setServerData] = useState(null)
    const [serverApplications, setServerApplications] = useState(null)

    useEffect(() => {
        setServerData(props.serverData)
        setServerApplications(props.serverApplications)
    }, [props.serverData, props.serverApplications])

    return (
        <>
            <div className={styles.applicationContainer}>
                <div>
                    <aside>
                        <h1>Cunt</h1>
                    </aside>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}