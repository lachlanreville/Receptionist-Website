import SideNav from "../../components/Navigation/SideNav"
import Guilds from "../../components/Guilds/"

import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"


export default () => {
    const { access_token, refresh_token } = useRouter().query

    useEffect(() => {
        if (!access_token || !refresh_token) {

        } else {
            window.localStorage.setItem("access_token", access_token)
            window.localStorage.setItem("refresh_token", refresh_token)
            window.location.href = "/dashboard"
        }

        return;
    }, [access_token])

    return (
        <>
            <SideNav type="user">
                <Guilds />
            </SideNav>

        </>
    )
}