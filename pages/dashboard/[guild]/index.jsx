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

      axios.post(`https://receptioni.st/api/guilds/${guild}/`,
        {
          access,
          refresh
        }).then(data => {
          setGuildData(data.data);
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

  useEffect(() => {
    if (!guildData) return;

    if (!guildData.database) {
      window.location.href = "https://discord.com/oauth2/authorize?client_id=697932571601797130&scope=bot&guild_id=" + guild + "&permissions=2134207679"
    }
  }, [guildData])

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
      {props.guildData ? <SideNav children={props.children} guildData={props.guildData.guildData[0]} type="server" title="Server Settings:" /> : <SideNav type="loading" />}
    </>
  )
}