import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Login.module.css';



interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Home | move.it</title>
                <meta property="og:title" content="Move.it - Pomodoro Technique App" key="title" />
                <meta property="og:image" content="/icons/favicon.png" />
                <meta property="og:image:type" content="image/png" />
            </Head>
            <img src="logo-full-white.svg" alt="Move.it logo" />
            <h3>Welcome</h3>
            <div>
                <img src="github.svg" alt="Github logo" />
                <p>Log in with your Github to get started</p>
                <form>
                    <input type="email"></input>
                    <button>ggg</button>
                </form>
            </div>
            <section className={styles.container}>






            </section>
        </div>



    )
}

// const { level } = useContext(ChallengesContext);
//     let name = 'Ted';
//     let username = '';

// useEffect(() => {
// const img = document.getElementById('user');
//         img.setAttribute('src', 'http://github.com/' + username + '.png');
// }, []}

//     return(
//         <div className={styles.profileContainer}>
//             <img id="user" src="http://github.com/github.png" alt={name}/>
//             <div>
//                 <strong>{name}</strong>
//                 <p>
//                     <img src="icons/level.svg" alt="level"/>
//                     Level {level}
//                 </p>
//             </div>
//         </div>
//     );

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { level, currentExperience, challengesCompleted } = ctx.req.cookies

    return {
        props: {
            level: Number(level ?? 1),
            currentExperience: Number(currentExperience ?? 0),
            challengesCompleted: Number(challengesCompleted ?? 0)
        }
    }
}
