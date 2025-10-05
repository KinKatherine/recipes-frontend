import React from 'react';
import Rating from '../Rating/Rating';
import styles from './RecipeCard.module.scss';
// 1. Импортируем нашу новую SVG иконку как React-компонент
import heartIconUrl from '../../assets/icons/heart.svg';

// Определяем типы для объекта recipe
interface Recipe {
    id: number;
    title: string;
    category: string;
    time: string;
    rating: number;
    imageUrl: string;
}

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className={styles.recipeCard}>
            <div className={styles.imageContainer}>
                <img src={recipe.imageUrl} alt={recipe.title} className={styles.image} />
                <button className={styles.favoriteBtn}>
                    <img src={heartIconUrl} alt="Добавить в избранное" />
                </button>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{recipe.title}</h3>
                <div className={styles.meta}>
                    <span>{recipe.category}</span>
                    <span>{recipe.time}</span>
                </div>
                <Rating rating={recipe.rating} />
            </div>
        </div>
    );
};

export default RecipeCard;