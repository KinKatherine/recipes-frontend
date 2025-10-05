import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                {}
                <div className="container">
                    <FavoritesPage />
                </div>
            </main>
        </div>
    );
}

export default App;