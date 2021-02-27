import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'
import GitHubCorner from './GitHubCorner';

export function Profile() {

    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/fncarneiro.png" alt="Photo Fernando Carneiro" />
            
            <div>
                <strong>Fernando Carneiro</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
                
            </div>
            <GitHubCorner projectUrl="https://github.com/fncarneiro" />
        </div>
    );
}

