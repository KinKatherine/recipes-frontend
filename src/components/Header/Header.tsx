import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

function Header() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={styles.siteHeader}>
            {/* Временные кнопки для смены языка */}
            <div className={styles.langSwitcher}>
                <button onClick={() => changeLanguage('ru')}>RU</button>
                <button onClick={() => changeLanguage('en')}>EN</button>
            </div>

            {/* Верхняя часть шапки */}
            <div className={styles.headerTop}>
                <div className={styles.container}>
                    <Link to="/" className={styles.logo}>recipes</Link>
                    <form className={styles.searchForm}>
                        <input type="text" placeholder={t('searchPlaceholder')} />
                        <button type="submit" aria-label="Искать">
                            <SearchIcon />
                        </button>
                    </form>
                    <div className={styles.authLinks}>
                        <Link to="/register">{t('registerLink')}</Link>
                        <Link to="/login">{t('loginLink')}</Link>
                    </div>
                </div>
            </div>

            {/* Нижняя часть шапки */}
            <div className={styles.headerBottom}>
                <div className={styles.container}>
                    <nav className={styles.mainNav}>
                        <Link to="/popular">{t('popularLink')}</Link>
                        <Link to="/categories">{t('categoriesLink')}</Link>
                        <Link to="/favorites" className={styles.favoritesLink}>
                            <HeartIcon />
                            <span>{t('favoritesLink')}</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;