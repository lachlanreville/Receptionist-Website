import { useState, useEffect } from "react";
import { useRouter } from "next/router"

export default (props) => {
    const [applications, setApplications] = useState(null)
    const router = useRouter();
    const { guild } = router.query

    useEffect(() => {
        setApplications(props.applications)
    }, [props.applications])

    const Applications = (props) => {
        return (
            <a href="#" onClick={() => router.push(router.pathname + `?application=${props.application.applicationId}`, `/dashboard/${guild}/applications?application=${props.application.applicationId}`, { shallow: true })} > {props.application.applicationName}</a>
        )
    }

    return (
        <>
            { applications ? applications.map((application, position) => <Applications application={application} position={position} />) : "Loading"}
        </>
    )
}