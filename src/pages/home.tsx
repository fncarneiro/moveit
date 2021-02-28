import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { signOut, useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox';
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';
import { Navbar } from '../components/Navbar';

import styles from '../styles/pages/Home.module.css';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return null

  if (!session) {
    useEffect(() => {
      setTimeout(() => {
        Router.push('/')
      }, 1000)
    }, [])
  }

  if (session) {
    return (
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={styles.dashboard}>
          <div className="aside">
            <Navbar />
          </div>
          <div className={styles.container}>
            <Head>
              <title>Home | move.it</title>
              <meta property="og:title" content="Move.it - Pomodoro Technique App" key="title" />
              <meta property="og:image" content="/icons/favicon.png" />
              <meta property="og:image:type" content="image/png" />
            </Head>

            <ExperienceBar />
            <CountdownProvider>
              <section>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </div>
      </ChallengesProvider>
    )
  }

  return (
    <div className={styles.accessDenied}>
      <h1>Acess denied!</h1>
      <p>Redirecting on few time.</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  const session = await getSession(ctx);

  return {
    props: {
      session,
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }
}
