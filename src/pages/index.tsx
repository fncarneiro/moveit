import Head from 'next/head';
import Router from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';

import styles from '../styles/pages/Landing.module.css';
import { useEffect } from 'react';

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null

  if (session) {
    useEffect(() => {
      Router.push('/home')
    }, [])

    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | move.it</title>
      </Head>

      <div className={styles.landingBox}>
        <div>
          <img src="/logo.svg" alt="Move.it" />

          <div className={styles.loginContent}>
            <h2>Welcome</h2>
            <p>
              Log in with your GitHub account
            </p>
            <button type="button" onClick={() => signIn('github')}>
              <FaGithub size={26} />
              GITHUB
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return {
    props: { session }
  }
}
