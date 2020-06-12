import Head from 'next/head'
import { useRouter } from 'next/router'
import TopNav from '../../../components/Navigation/TopNav/'

import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { guild } = router.query

  useEffect(() => {
    if (!guild) return;
    console.log(guild)
  }, [guild])

  return (
    <>
      <TopNav />
    </>
  )
}
