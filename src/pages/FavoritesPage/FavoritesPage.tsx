import React from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from './FavoritesPage.module.scss';

// Временные данные
const favoriteRecipes = [
{ id: 1, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 2, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 4, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 3, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 4, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 5, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 4, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 6, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 7, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
{ id: 8, title: 'пельмешки', category: 'обед', time: '10 минут', rating: 5, imageUrl: 'https://via.placeholder.com/300x200' },
];

const FavoritesPage: React.FC = () => {
return (
<div className={styles.favoritesPage}>
<h1 className={styles.title}>Моё избранное</h1>
<div className={styles.recipeGrid}>
{favoriteRecipes.map(recipe => (
<RecipeCard key={recipe.id} recipe={recipe} />
))}
</div>
</div>
);
};

export default FavoritesPage;