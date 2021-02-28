import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { FaSignOutAlt } from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';

import styles from '../styles/components/Navbar.module.css';

export function Navbar() {
  const router = useRouter();
  function isActive(route) {
    if (route === router.pathname) {
      return 'active'
    } else ''
  }

  return (
    <div className={styles.navbarContainer}>
      <header>
        <Link href="/home">
          <a>
            <img src="/logo-icon.svg" alt="Move.it" />
          </a>
        </Link>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/home">
              <a className={isActive('/home')}>
                <BiHomeAlt size={36} />
              </a>
            </Link>
          </li>          
        </ul>
      </nav>
      <footer>
        <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>
          Sair
          <FaSignOutAlt />
        </button>
      </footer>
    </div>
  )
}
