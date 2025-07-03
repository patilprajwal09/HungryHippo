import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Footer from './components/footer/Footer';
import LoginPopUp from './components/loginPopUp/LoginPopUp';
import Home from './pages/home/Home';


const App = () => {

  const [showLogin,setShowLogin]=useState(false);

  return (
    <>

     {showLogin && <LoginPopUp setShowLogin={setShowLogin}/>}

     <div className='app'>

      <Navbar setShowLogin={setShowLogin}/>

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
        </Routes>
      </main>
      
    </div>

    <Footer/>
    
    </>
   
  )
}

export default App;
