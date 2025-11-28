import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import Tour from '../Pages/Tour'
import TourDetails from '../Pages/TourDetails'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import SearchResultList from '../Pages/SearchResultList'
import ThankYou from '../Pages/ThankYou'

const Routers = () => {
    return (
        <Routes>
            <Route path='/'  element={<Home/>} />
            <Route path='/Home' element={<Home/>} />
            <Route path='/tours' element={<Tour/>} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/thankyou' element={<ThankYou />} />
            <Route path='/tours/search' element={<SearchResultList />} />
        </Routes>

    )
}

export default Routers