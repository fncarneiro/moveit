import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
import GitHubCorner from './GitHubCorner';
import { useSession } from 'next-auth/client';

export function Profile() {
    const [ session ] = useSession();
    const { level } = useContext(ChallengesContext);
    
    return (
        <div className={styles.profileContainer}>
           
            <img src={session.user.image} alt={session.user.name} />
            
            <div>
                <strong>{session.user.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
                
            </div>
            <GitHubCorner projectUrl="https://github.com/fncarneiro" />
        </div>
    );
}

