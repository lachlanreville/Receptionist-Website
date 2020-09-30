import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import styles from "./applications.module.css"
import DisplayApplications from "./DisplayApplications/"
import ApplicationForm from "./ApplicationForm/"

export default (props) => {
    const [serverData, setServerData] = useState(null)
    const [serverApplications, setServerApplications] = useState(null)
    const [specificApplication, setSpecificApplication] = useState(null)
    const router = useRouter();

    useEffect(() => {
        setServerData(props.serverData)
        setServerApplications(props.serverApplications)
    }, [props.serverData, props.serverApplications])

    useEffect(() => {
        if (!router.query.application) return;
        let access = window.localStorage.getItem("access_token")
        let refresh = window.localStorage.getItem("refresh_token")

        let applicationId = router.query.application;
        const getSpecificAppliction = async () => {
            axios.post(`https://receptioni.st/api/guilds/${guild}/applications/${applicationId}/`,
                {
                    access,
                    refresh
                }).then(data => {
                    data = data.data;
                    setSpecificApplication(data.applicationNames[0])
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                        if (error.response.status == 401) {
                            window.location.href = "/dashboard/"
                        }
                        if (error.response.status == 429) {
                            setTimeout(getSpecificAppliction, 3000)
                        }
                    }

                })
        }
        //getSpecificAppliction()

    }, [router])

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