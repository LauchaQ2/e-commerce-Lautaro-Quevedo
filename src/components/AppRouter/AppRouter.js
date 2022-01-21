import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import NavBar from '../NavBar/NavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer';
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import HomePage from '../../pages/HomePage/HomePage.js';
import ContactPage from '../../pages/ContactPage/ContactPage.js';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage.js';
import ItemListContainer from '../ItemListContainer/ItemListContainer.js';
import CartPage from '../../pages/CartPage/CartPage.js';
import {CartProvider} from '../../context/CartContext';
import logoHome from '../../assets/YoTomo/logo.svg'
import 'animate.css';


export default function AppRouter(){
    const [initate, setInitate] = useState(true)
    useEffect(()=>{
        setTimeout( () => {
          setInitate(false)
        }, 3000);
        },[])

    return(
        <>
      {
        initate
        ?
      <div className='homeAnimated'>
        <img className='img-fluid animate__animated animate__flipInX' id='logoAnimated' src={logoHome} />
      </div>
      :
        <BrowserRouter>
            <CartProvider>
            <NavBar/>
                <Routes>
                <Route path="/category/:category" element={<ItemListContainer/>}/>
                <Route path="/aboutus" element={<AboutUsPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/product/:id" element={<ItemDetailContainer/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route index element={<HomePage />}/> 
                </Routes>
                </CartProvider>
            <Footer/>
      </BrowserRouter>
    }
</>
    )
}