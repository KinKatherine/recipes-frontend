import React from 'react';
import styles from './UserProfile.module.scss';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const UserProfile = () => {
  const userAvatar = null; 

  return (
    <div className={styles.profilePageWrapper}>
      {/* Переименовываем классы, чтобы избежать конфликтов */}
      <div className={styles.profileTopBanner}></div>

      <main className={styles.profileMainContent}>
        <section className={styles.profileInfo}>
          <h1 className={styles.title}>Мой профиль</h1>
          
          <div className={styles.avatarContainer}>
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" />
            ) : (
              <div className={styles.avatarPlaceholder}></div>
            )}
            <div className={styles.editIconContainer}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0427 4.45784C17.4333 4.06731 17.9665 3.8418 18.5207 3.8418C19.0749 3.8418 19.6081 4.06731 19.9986 4.45784C20.3891 4.84836 20.6146 5.38158 20.6146 5.93577C20.6146 6.49 20.3891 7.02322 19.9986 7.41374L8.15796 19.2544L3.38525 20.6146L4.74541 15.8419L16.5861 4.00122C16.7813 3.80596 16.9352 3.57396 17.0427 3.31811" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
          </div>

          <p className={styles.username}>Kinkate</p>
        </section>

        <section className={styles.recipesSection}>
          <h2 className={styles.recipesTitle}>Все рецепты</h2>
          <div className={styles.recipesGrid}>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <div className={styles.addRecipeCard}>
              <div className={styles.addIcon}>+</div>
              <span>Добавить новый рецепт</span>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.profileBottomBanner}></div>
    </div>
  );
};

export default UserProfile;
