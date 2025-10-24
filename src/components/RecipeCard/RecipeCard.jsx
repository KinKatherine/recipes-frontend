import { useState } from 'react';
import styles from './RecipeCard.module.scss';
import heartFilled from '../../assets/like-heart-filled.svg';
import heartEmpty from '../../assets/like-heart-empty.svg';
import defaultImage from '../../assets/fake-recipes-images/dumplings.svg';
import StarRating from '../StarRating';

const RecipeCard = ({ recipe = {}, isSmall, isFavorite = false }) => {
  // --- Логика лайков из upstream ---
  const [isLiked, setIsLiked] = useState(isFavorite);
  const HandleLikeToggle = (event) => {
    event.stopPropagation();
    setIsLiked(prevIsLiked => !prevIsLiked);
  };
  const heartIcon = isLiked ? heartFilled : heartEmpty;

  // --- Логика заглушек из stashed ---
  const defaultData = {
    image: defaultImage,
    name: 'Название рецепта',
    meal: 'Ужин',
    time: '50 мин',
    rating: 4
  };

  // Объединяем данные: если recipe пустой, используются defaultData
  const displayData = {
    ...defaultData,
    ...recipe
  };

  const smallClass = isSmall ? styles['card--small'] : '';
  const cardClasses = `${styles.card} ${smallClass}`;

  return (
    <div className={cardClasses}>
      <div className={styles['frame']}>
        <div className={styles['image-container']}>
          <img src={displayData.image} alt={displayData.name} className={styles.recipeImage} />
          <div className={styles['favorite']} onClick={HandleLikeToggle}>
            <img src={heartIcon} alt="" className={styles.heart} />
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['name']}>
            <p>{displayData.name}</p>
          </div>
          <div className={styles['content']}>
            <div className={styles['text']}>
              <p className={styles['meal']}>{displayData.meal}</p>
              <p className={styles['time']}>{displayData.time}</p>
            </div>
            <div className={styles['rating']}>
              {/* Используем StarRating из upstream */}
              <StarRating rating={displayData.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
