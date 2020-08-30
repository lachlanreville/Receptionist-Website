import React, { useState, useEffect } from "react"
import { Container, Column, Row, Break, RowUncentered } from '../Containers'
import axios from "axios"

export default (props) => {

    const [guilds, setGuilds] = useState(null)

    useEffect(() => {
        const getGuilds = async () => {
            let access = window.localStorage.getItem("access_token")
            let refresh = window.localStorage.getItem("refresh_token")

            axios.post("https://receptioni.st/api/users/guilds",
                {
                    access,
                    refresh
                }).then(data => {
                    setGuilds(data.data)
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                        if (error.response.status == 401) {
                            window.location.href = "/api/login"
                        }
                        if (error.response.status == 429) {
                            setTimeout(getGuilds, 3000)
                        }
                    }

                })
            return null;
        }
        getGuilds()
    }, [])

    return (
        <>
            <Row>
                {guilds ?
                    guilds.map((guild, position) => <DisplayGuilds guilds={guild} position={position} />)
                    :
                    <Column size="1">
                        <img src="https://receptioni.st/img/ReceptionistLoadingScreen.gif" alt="Loading Gif" width="256" height="256" style={{ margin: "auto" }} />
                    </Column>}
            </Row>
        </>
    )
}

const DisplayGuilds = (props) => {
    console.log(props)
    return (
        <Column size="6" key={props.position}>
            {props.guilds.icon ?
                <img src={"https://cdn.discordapp.com/icons/" + props.guilds.id + "/" + props.guilds.icon + ".webp?size=256"} width="96" height="96" />
                :
                <img src="https://receptioni.st/img/Logo-3.png" width="96" height="96" />}

            <div>
                <h3>
                    {props.guilds.name}
                </h3>
                <a href="https://cat.com">
                    Select
                    </a>
            </div>
        </Column >
    )
}