import styles from './Navbar.module.scss';
import search_icon from '../../assets/search-icon.svg';
import line_sign_in from '../../assets/line-sign-in.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Перенаправляем на главную после выхода
  };

  return (
    <div className={styles.navbar}>
      <div className={styles['home-bar']}>
        <Link to="/" className={styles['recipies-home']}>
          recipies
        </Link>
      </div>
      <div className={styles['search-box']}>
        <input type="text" placeholder="Search" />
        <img src={search_icon} alt="" className={styles['search-icon']} />
      </div>

      <ul className={styles['sign-in']}>
        {isLoggedIn ? (
          <>
            <li><Link to="/profile">Профиль ({currentUser.username})</Link></li>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Выйти</li>
          </>
        ) : (
          <>
            <li><Link to="/login">Sign in</Link></li>
            <img src={line_sign_in} alt="" className={styles['line-sign-in']} />
            <li>Registrate</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
