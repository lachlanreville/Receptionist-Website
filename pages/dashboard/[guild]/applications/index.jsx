import Head from 'next/head'
import SideNav from '../../../../components/Navigation/SideNav/'
import { Row, Column, Break } from '../../../../components/Containers/'
import axios from "axios"
import * as styles from "./index.module.css"
import Application from "../../../../components/Applications/"
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [applications, setApplications] = useState(null)
    const [serverData, setServerData] = useState(null)
    const [guildInfo, setGuildInfo] = useState(null)
    const router = useRouter();

    const { guild } = router.query

    useEffect(() => {
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
                    setGuildInfo(data.guildInfo)
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
            <DisplayData guildData={serverData}>
                <Break height="20" />
                <Application serverApplications={applications} serverData={guildInfo} />
            </DisplayData>
        </>
    )
}


function DisplayData(props) {
    return (
        <>
            {props.guildData ? <SideNav children={props.children} guildData={props.guildData} type="server" title="Applications:" /> : <SideNav type="loading" />}
        </>
    )
}
