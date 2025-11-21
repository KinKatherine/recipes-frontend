import styles from './Catalog.module.scss'
import heart_icon from '../../assets/fav-heart-icon.svg'
//import {Link} from 'react-router-dom'

const Catalog = () => {
  const popularRus = "Популярное";
  const categoriesRus = "Категории";
  const favoriteRus = "Избранное";
  return (
    <ul className={styles.catalog}>
      
        <a href="/popular">{popularRus}</a>
        <li>{categoriesRus}</li>
        <a href="/favorite" className={styles['favourites']}>
          <img src={heart_icon} alt="" className={styles['heart-icon']}></img> 
          {favoriteRus}
        </a>
     
    </ul>
  )
}

export default Catalog