import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import styles from "./DisplayApplications.module.css"

export default (props) => {
    const [applications, setApplications] = useState(null)
    const router = useRouter();
    const { guild } = router.query

    useEffect(() => {
        setApplications(props.applications)
    }, [props.applications])

    const Applications = (props) => {
        return (
            <li className={styles.buttons}>
                <a className={styles.aCenter} href="#" onClick={() => router.push(router.pathname + `?application=${props.application.applicationId}`, `/dashboard/${guild}/applications?application=${props.application.applicationId}`, { shallow: true })} > {props.application.applicationName}</a>
            </li>
        )
    }

    return (
        <ul className={styles.navDecoration}>
            { applications ? applications.map((application, position) => <Applications application={application} position={position} />) : "Loading"}
        </ul>
    )
}