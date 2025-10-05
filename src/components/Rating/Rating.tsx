import React from 'react';
import styles from './Rating.module.scss';

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);

    return (
        <div className={styles.rating}>
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} className={`${styles.star} ${index < filledStars ? styles.filled : ''}`}>
          ★
        </span>
            ))}
        </div>
    );
};

export default Rating;