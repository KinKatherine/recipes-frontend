import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Favorite from './pages/Favorite/Favorite';
import UserProfile from './pages/UserProfile/UserProfile';
import RecipePage from './pages/RecipePage/RecipePage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Catalog /> 
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/recipe" element={<RecipePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
