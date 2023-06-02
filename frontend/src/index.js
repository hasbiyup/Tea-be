import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import App from './webpage/App';
import reportWebVitals from './reportWebVitals';
import Home from './webpage/HomePage';
import Catalogue from './webpage/CataloguePage';
import Camera from './webpage/camera/CameraPage';
import Angry from './webpage/MoodAngryPage';
import Disgust from './webpage/MoodDisgustPage';
import Fear from './webpage/MoodFearPage';
import Happy from './webpage/MoodHappyPage';
import Neutral from './webpage/MoodNeutralPage';
import Sad from './webpage/MoodSadPage';
import Surprise from './webpage/MoodSurprisePage';

import DetailProductAngry from './webpage/DetailProductAngry';
import DetailProductDisgust from './webpage/DetailProductDisgust';
import DetailProductFear from './webpage/DetailProductFear';
import DetailProductHappy from './webpage/DetailProductHappy';
import DetailProductNeutral from './webpage/DetailProductNeutral';
import DetailProductSad from './webpage/DetailProductSad';
import DetailProductSurprise from './webpage/DetailProductSurprise';
import DetailProductCatalogue from './webpage/DetailProductCatalogue';

import LoginPage from './webpage/LoginPage';
import Admin from './webpage/Admin';
import Dashboard from './webpage/Dashboard';
import TeaMenuAdmin from './webpage/TeaMenuAdmin';
import FoodMenuAdmin from './webpage/FoodMenuAdmin';
import FoodPairingAdmin from './webpage/FoodPairingAdmin';
import Staff from './webpage/StaffPage';

import FoodPairingAngry from './webpage/FoodPairingAngry';

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} Route/>
        <Route path="home" element={<Home />} Route/>
        <Route path="camera" element={<Camera />} Route/>

        <Route path="catalogue" element={<Catalogue />} Route/>
        <Route path="product-details-catalogue" element={<DetailProductCatalogue />} >
            {/* Memanggil product angry base id */}
            <Route path=":allId" element={<DetailProductCatalogue />} /> 
        </Route>

        {/* Mood Angry */}
        <Route path='angry' element={<Angry />} Route/>
        <Route path="product-details-angry" element={<DetailProductAngry />} >
            {/* Memanggil product angry base id */}
            <Route path=":angryId" element={<DetailProductAngry />} /> 
        </Route>

        {/* Mood Disgust */}
        <Route path='disgust' element={<Disgust />} Route/>
        <Route path="product-details-disgust" element={<DetailProductDisgust />} >
            {/* Memanggil product disgust base id */}
            <Route path=":disgustId" element={<DetailProductDisgust />} /> 
        </Route>

        {/* Mood Fear */}
        <Route path='fear' element={<Fear />} Route/>
        <Route path="product-details-fear" element={<DetailProductFear />} >
            {/* Memanggil product fear base id */}
            <Route path=":fearId" element={<DetailProductFear />} /> 
        </Route>

        {/* Mood Happy */}
        <Route path='happy' element={<Happy />} Route/>
        <Route path="product-details-happy" element={<DetailProductHappy />} >
            {/* Memanggil product happy base id */}
            <Route path=":happyId" element={<DetailProductHappy />} /> 
        </Route>

        {/* Mood Neutral */}
        <Route path='neutral' element={<Neutral />} Route/>
        <Route path="product-details-neutral" element={<DetailProductNeutral />} >
            {/* Memanggil product neutral base id */}
            <Route path=":neutralId" element={<DetailProductNeutral />} /> 
        </Route>

        {/* Mood Sad */}
        <Route path='sad' element={<Sad />} Route/>
        <Route path="product-details-sad" element={<DetailProductSad />} >
            {/* Memanggil product sad base id */}
            <Route path=":sadId" element={<DetailProductSad />} /> 
        </Route>

        {/* Mood Surprise */}
        <Route path='surprise' element={<Surprise />} Route/>
        <Route path="product-details-surprise" element={<DetailProductSurprise />} >
            {/* Memanggil product surprise base id */}
            <Route path=":surpriseId" element={<DetailProductSurprise />} /> 
        </Route>

        {/* Login Page */}
        <Route path='login-page' element={<LoginPage />} Route/>

        {/* Admin Page */}
        <Route path='admin' element={<Admin />} Route/>

        {/* Admin Site */}
        <Route path='/dashboard' element={<Dashboard />} Route/>
        <Route path='/tea-menu-admin' element={<TeaMenuAdmin />} Route/>
        <Route path='/food-menu-admin' element={<FoodMenuAdmin />} Route/>
        <Route path='/food-pairing-admin' element={<FoodPairingAdmin />} Route/>
        <Route path='/staff' element={<Staff />} Route/>

        {/* Food Pairing */}
        <Route path='/food-pairing-angry' element={<FoodPairingAngry />} Route/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();