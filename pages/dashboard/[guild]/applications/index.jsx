import Head from 'next/head'
import { useRouter } from 'next/router'
import SideNav from '../../../../components/Navigation/SideNav/'
import { Row, Column, Break } from '../../../../components/Containers/'
import axios from "axios"

import React, { useEffect, useState } from 'react';

export default function Home() {
    const [applications, setApplications] = useState(null)
    const [serverData, setServerData] = useState(null)
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
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                        if (error.response.status == 401) {
                            window.location.href = "/dashboard/"
                        }
                        if (error.response.status == 429) {
                            setTimeout(getGuilds, 3000)
                        }
                    }

                })
            return null;
        }
        getApplications()

    }, [guild])

    console.log(applications)
    return (
        <>
            <DisplayData guildData={serverData}>
                <Break height="100" />
                <Row>
                    {applications.map(c => { <DisplayApplications application={c} /> })}
                </Row>

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

function DisplayApplications(props) {
    return (
        <div>
            <a href={"https://receptioni.st/dashboard/" + guild + "/applications/" + props.application.applicationId}><h1>{props.application.applicationName}</h1></a>
        </div>
    )
}