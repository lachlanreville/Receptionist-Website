import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import styles from "./applications.module.css"
import DisplayApplications from "./DisplayApplications/"
import ApplicationForm from "./ApplicationForm/"

export default (props) => {
    const [serverData, setServerData] = useState(null)
    const [serverApplications, setServerApplications] = useState(null)
    const [specificApplication, setSpecificApplication] = useState(null)

    useEffect(() => {
        setServerData(props.serverData)
        setServerApplications(props.serverApplications)
    }, [props.serverData, props.serverApplications])

    return (
        <>
            <div className={styles.applicationContainer}>
                <div>
                    <aside className={styles.applicationNav}>
                        <DisplayApplications applications={serverApplications} />
                    </aside>
                </div>
                <div className={styles.applicationForm}>
                    <ApplicationForm application={specificApplication} />
                </div>
            </div>
        </>
    )
}