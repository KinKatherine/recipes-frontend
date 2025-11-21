import styles from'./Navbar.module.scss'
import search_icon from '../../assets/search-icon.svg'
import line_sign_in from '../../assets/line-sign-in.svg'
import { useContext, useState } from 'react';
import RegistWindow from '../RegistWindow/RegistWindow';
import SignInWindow from '../SignInWindow/SignInWindow';
import AuthContext from '../../context/AuthProvider';
import LogoutWindow from '../LogoutWindow/LogoutWindow';

import avatar from '../../assets/ratatouille.svg'

//import {Link} from 'react-router-dom'

const Navbar = ({onOpenLogin}) => {
  const {auth, setAuth} = useContext(AuthContext);

  const handleLogout = () => {
    setAuth({ user: null, role: null, accessToken: null });
    localStorage.removeItem('accessToken');
  }

  const isAdmin = Array.isArray(auth?.roles) 
    ? auth.roles.includes('ADMIN')
    : auth?.roles === 'ADMIN';

  const [isRegistOpen, setIsRegistOpen] = useState(false);
  const openRegist = () => setIsRegistOpen(true);
  const closeRegist = () => setIsRegistOpen(false);

  const [isSignInOpen, setIsSignIntOpen] = useState(false);
  const openSignIn = () => setIsSignIntOpen(true);
  const closeSignIn = () => setIsSignIntOpen(false);

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const openLogout = () => setIsLogoutOpen(true);
  const closeLogout= () => setIsLogoutOpen(false);


  const searchName = "Поиск";
  const registName = "Регистрация";
  const signInName = "Вход";
  const signOutRus = "Выход";
  return (
    <div className={styles.navbar}>
      <div className={styles['home-bar']}>
        <a href="/" className={styles['recipies-home']}>recipies</a>
      </div>
      <div className={styles['search-box']}>
        <input type="text" placeholder={searchName}/>
        <img src={search_icon} alt="" className={styles['search-icon']}/> 
      </div>
      {auth?.token ? (
        <ul className={styles["userPanel"]}>
          <li className={styles["userInfo"]}>
            {auth.user}
            <div className={styles["avatarFrame"]}>
              <img src={avatar} className={styles["avatarImg"]}/>
            </div>
          </li>
            <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
            <li onClick={openLogout} className={styles['signOut']}>{signOutRus}</li>
            {isLogoutOpen &&
             <LogoutWindow 
            onClose={closeLogout}
            onButton={handleLogout}/>}
        </ul>
      ) : (
      <ul className={styles['sign-in']}>
        <li onClick={openRegist}>{registName}</li>
        {isRegistOpen && <RegistWindow onClose={closeRegist}/>}
        <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
        <li onClick={openSignIn}>{signInName}</li>
        {isSignInOpen && <SignInWindow onClose={closeSignIn}/>}
      </ul>
      )}
        
    </div>
  )
}

export default Navbar;