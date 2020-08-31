import Head from 'next/head'
import { useRouter } from 'next/router'
import SideNav from '../../../components/Navigation/SideNav/'

import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { guild } = router.query

  useEffect(() => {

  }, [guild])

  return (
    <>
      <SideNav type="server" guildid={guild}>

      </SideNav>
    </>
  )
}
