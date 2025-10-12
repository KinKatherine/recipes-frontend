import styles from'./Navbar.module.scss'
import search_icon from '../../assets/search-icon.svg'
import line_sign_in from '../../assets/line-sign-in.svg'
//import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles['home-bar']}>
        <a href="/" className={styles['recipies-home']}>recipies</a>
      </div>
      <div className={styles['search-box']}>
        <input type="text" placeholder='Search'/>
        <img src={search_icon} alt="" className={styles['search-icon']}/> 
      </div>

      <ul className={styles['sign-in']}>
        <li>Registrate</li>
        <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
        <li>Sign in</li>
      </ul>
        
    </div>
  )
}

export default Navbar;