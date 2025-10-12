import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Catalog from './components/Catalog/Catalog'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
      <div >
        <Navbar/>
        <Catalog/>
        <div className="content">
          <Home/>
        </div>
        <Footer/>
      </div>
  );
}

export default App