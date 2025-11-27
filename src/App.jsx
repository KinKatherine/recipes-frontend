import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Favorite from './pages/Favorite/Favorite';
import UserProfile from './pages/Profile/Profile';
import RecipePage from './pages/RecipePage/RecipePage';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Компонент для защиты роутов
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recipe" element={<RecipePage />} />
      
      {/* Защищенные роуты */}
      <Route path="/favorite" element={<ProtectedRoute><Favorite /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      
      {/* Раздельные роуты для чата */}
      <Route 
        path="/chatadmin" 
        element={<ProtectedRoute><ChatPage isAdmin={true} /></ProtectedRoute>} 
      />
      <Route 
        path="/chatuser" 
        element={<ProtectedRoute><ChatPage isAdmin={false} /></ProtectedRoute>} 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Catalog /> 
          <div className="content">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
