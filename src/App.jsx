import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Catalog from './components/Catalog/Catalog';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Favorite from './pages/Favorite/Favorite';
import UserProfile from './pages/Profile/Profile';
import RecipePage from './pages/RecipePage/RecipePage';
import ChatPage from './pages/ChatPage/ChatPage';
import Popular from './pages/Popular/Popular';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; // Импортируем ErrorBoundary
// import { AuthProvider } from './context/AuthProvider'; 

const App = () => {
  return (
    // <AuthProvider>
      <Router>
        <ErrorBoundary> {/* Оборачиваем все приложение в ErrorBoundary */}
          <div>
            <Navbar />
            <Catalog /> 
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/chatadmin" element={<ChatPage isAdmin={true} />} />
                <Route path="/chatuser" element={<ChatPage isAdmin={false} />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    // </AuthProvider>
  );
};

export default App;
