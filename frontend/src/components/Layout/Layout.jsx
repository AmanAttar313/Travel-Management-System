import React from 'react'
import Header from '../header/Header';
import Routers from '../../router/Routers';
import Footer from '../footer/Footer';
import { AuthProvider } from '../../contexts/AuthContext';


const Layout = () => {
  return <>
  <AuthProvider>
  <Header/>
  <Routers/>
  <Footer/>
  </AuthProvider>

  </>
   
  
}

export default Layout;