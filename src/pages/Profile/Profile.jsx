import styles from './Profile.module.scss';
import defaultPhoto from '../../assets/profile-photo-default.svg';
import editIcon from '../../assets/edit-icon.svg';
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import fish from '../../assets/fake-recipes-images/fish.svg';
import khachapuri from '../../assets/fake-recipes-images/khachapuri.svg';

const NewRecipesData = [
  { id: 1, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 2, authorUsername: 'modory', name: 'запечённая рыба', image: fish, meal: 'ужин', time: '90 минут', rating: 3 },
];

const Profile = () => {
  const { currentUser } = useAuth();
  const data = NewRecipesData;

  return (
    <div className={styles.profile}>
      <div className={styles["headerBlock"]}>
        <p className={styles["header"]}>
          Мой профиль
        </p>
      </div>
      <div className={styles["profileBlock"]}>
        <div className={styles["username"]}>
          {currentUser?.username}
        </div>
      
        <div className={styles["imageFrame"]}>
          <img src={defaultPhoto} className={styles["photo"]} alt="Profile"/>
        </div>
        <img src={editIcon} className={styles["editIcon"]} alt="Edit"/>
      </div>

      {/* --- Кнопки чата в зависимости от роли --- */}
      <div className={styles.chatButtonContainer}>
        {currentUser?.isAdmin ? (
          // Кнопка для админа
          <Link to="/chatadmin" className={styles.chatButton}>
            Управление чатами
          </Link>
        ) : (
          // Кнопка для обычного пользователя
          <Link to="/chatuser" className={styles.chatButton}>
            Чат с поддержкой
          </Link>
        )}
      </div>

      <p className={styles["title"]}>Мои рецепты</p>
      <div className={styles["recipesBlock"]}>
        <BlocksRecipe data={data} isFavoriteSection={false}/>
      </div>
    </div>
  );
};

export default Profile;
