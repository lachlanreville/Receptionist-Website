import Head from 'next/head'
import { useRouter } from 'next/router'
import SideNav from '../../../components/Navigation/SideNav/'
import axios from "axios"

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [guildData, setGuildData] = useState(null)
  const router = useRouter();
  const { guild } = router.query

  useEffect(() => {
    if (!guild) return;

    const getGuilds = async () => {
      let access = window.localStorage.getItem("access_token")
      let refresh = window.localStorage.getItem("refresh_token")

      axios.post("https://receptioni.st/api/users/guilds/canEdit",
        {
          access,
          refresh,
          guildid: guild
        }).then(data => {
          setGuildData(data.data)
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
    getGuilds()

  }, [guild])

  console.log(guildData)

  return (
    <>
      <DisplayData guildData={guildData}>

      </DisplayData>
    </>
  )
}


function DisplayData(props) {
  return (
    <>
      {props.guildData ? <SideNav children={props.children} guildData={props.guildData} type="server" /> : <SideNav type="loading" />}
    </>
  )
}