import Head from 'next/head'
import { useRouter } from 'next/router'
import SideNav from '../../../../components/Navigation/SideNav/'
import { Row, Column, Break } from '../../../../components/Containers/'
import axios from "axios"
import * as styles from "./index.module.css"

import React, { useEffect, useState } from 'react';

export default function Home() {
    const [applications, setApplications] = useState(null)
    const [serverData, setServerData] = useState(null)
    const router = useRouter();

    const { guild } = router.query

    useEffect(() => {

        // repush so vercel works...
        if (!guild) return;

        const getApplications = async () => {
            let access = window.localStorage.getItem("access_token")
            let refresh = window.localStorage.getItem("refresh_token")

            axios.post(`https://receptioni.st/api/guilds/${guild}/applications/`,
                {
                    access,
                    refresh
                }).then(data => {
                    data = data.data;
                    setApplications(data.applicationNames)
                    setServerData(data.serverData)
                    console.log(data)
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                        if (error.response.status == 401) {
                            window.location.href = "/dashboard/"
                        }
                        if (error.response.status == 429) {
                            setTimeout(getApplications, 3000)
                        }
                    }

                })
            return null;
        }
        getApplications()

    }, [guild])

    const DisplayApplications = (props) => {
        return (
            <Column size="5" key={props.position}>
                <a className={styles.applicationName} href="#" onClick={() => router.push(router.pathname + `?application=${props.application.applicationId}`, `/dashboard/${guild}/applications?application=${props.application.applicationId}`, { shallow: true })} > {props.application.applicationName}</a>
            </Column>
        )
    }

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
                    console.log(data)
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
        setTimeout(getSpecificAppliction, 3000)

    }, [router])

    return (
        <>
            <div></div>
            <DisplayData guildData={serverData}>
                <Break height="50" />
                <Row>
                    {applications ? applications.map((application, position) => <DisplayApplications guild={guild} application={application} position={position} />) : <img src="https://receptioni.st/img/ReceptionistLoadingScreen.gif" alt="Loading Gif" width="256" height="256" style={{ margin: "auto" }} />
                    }
                </Row>
            </DisplayData>
        </>
    )
}


function DisplayData(props) {
    console.log(props)
    return (
        <>
            {props.guildData ? <SideNav children={props.children} guildData={props.guildData} type="server" title="Applications:" /> : <SideNav type="loading" />}
        </>
    )
}