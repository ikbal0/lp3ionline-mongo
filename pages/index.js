import Head from 'next/head'
import { signIn } from "next-auth/react"
import {getCsrfToken} from 'next-auth/react';
import {getSession} from 'next-auth/react';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button 
      onClick={() => signIn()} 
      className="w-100 btn btn-lg btn-primary"
      type="button"
      >Sign in
      </button>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session){
    if(session.level == '1'){
      return {
        redirect: {
          permanent: false,
          destination: "/peserta"
        }
      }
    } else if(session.level == '2'){
      return {
        redirect: {
          permanent: false,
          destination: "/dosen"
        }
      }
    } else if(session.level == '3'){
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard-admin"
        }
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}