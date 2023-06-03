import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
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
import FoodPairingDisgust from './webpage/FoodPairingDisgust';
import FoodPairingHappy from './webpage/FoodPairingHappy';
import FoodPairingFear from './webpage/FoodPairingFear';
import FoodPairingSad from './webpage/FoodPairingSad';
import FoodPairingNeutral from './webpage/FoodPairingNeutral';
import FoodPairingSurprise from './webpage/FoodPairingSurprise';

import DetailFoodAngry from './webpage/DetailFoodAngry';
import DetailFoodDisgust from './webpage/DetailFoodDisgust';
import DetailFoodFear from './webpage/DetailFoodFear';
import DetailFoodHappy from './webpage/DetailFoodHappy';
import DetailFoodNeutral from './webpage/DetailFoodNeutral';
import DetailFoodSad from './webpage/DetailFoodSad';
import DetailFoodSurprise from './webpage/DetailFoodSurprise';

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} Route/>
        <Route path="home" element={<Home />} Route/>
        <Route path="camera" element={<Camera />} Route/>

        <Route path="catalogue" element={<Catalogue />} Route/>
        <Route path="product-details-catalogue" element={<DetailProductCatalogue />} >
            <Route path=":allId" element={<DetailProductCatalogue />} /> 
        </Route>
        <Route path='angry' element={<Angry />} Route/>
        <Route path="product-details-angry" element={<DetailProductAngry />} >
            <Route path=":angryId" element={<DetailProductAngry />} /> 
        </Route>
        <Route path='disgust' element={<Disgust />} Route/>
        <Route path="product-details-disgust" element={<DetailProductDisgust />} >
            <Route path=":disgustId" element={<DetailProductDisgust />} /> 
        </Route>
        <Route path='fear' element={<Fear />} Route/>
        <Route path="product-details-fear" element={<DetailProductFear />} >
            <Route path=":fearId" element={<DetailProductFear />} /> 
        </Route>
        <Route path='happy' element={<Happy />} Route/>
        <Route path="product-details-happy" element={<DetailProductHappy />} >
            <Route path=":happyId" element={<DetailProductHappy />} /> 
        </Route>
        <Route path='neutral' element={<Neutral />} Route/>
        <Route path="product-details-neutral" element={<DetailProductNeutral />} >
            <Route path=":neutralId" element={<DetailProductNeutral />} /> 
        </Route>
        <Route path='sad' element={<Sad />} Route/>
        <Route path="product-details-sad" element={<DetailProductSad />} >
            <Route path=":sadId" element={<DetailProductSad />} /> 
        </Route>
        <Route path='surprise' element={<Surprise />} Route/>
        <Route path="product-details-surprise" element={<DetailProductSurprise />} >
            <Route path=":surpriseId" element={<DetailProductSurprise />} /> 
        </Route>
        <Route path='login-page' element={<LoginPage />} Route/>
        <Route path='admin' element={<Admin />} Route/>
        <Route path='/dashboard' element={<Dashboard />} Route/>
        <Route path='/tea-menu-admin' element={<TeaMenuAdmin />} Route/>
        <Route path='/food-menu-admin' element={<FoodMenuAdmin />} Route/>
        <Route path='/food-pairing-admin' element={<FoodPairingAdmin />} Route/>
        <Route path='/staff' element={<Staff />} Route/>
        <Route path='/food-pairing-angry' element={<FoodPairingAngry />} Route/>
        <Route path='/food-pairing-disgust' element={<FoodPairingDisgust />} Route/>
        <Route path='/food-pairing-happy' element={<FoodPairingHappy />} Route/>
        <Route path='/food-pairing-fear' element={<FoodPairingFear />} Route/>
        <Route path='/food-pairing-sad' element={<FoodPairingSad />} Route/>
        <Route path='/food-pairing-neutral' element={<FoodPairingNeutral />} Route/>
        <Route path='/food-pairing-surprise' element={<FoodPairingSurprise />} Route/>

        <Route path='/food-details-angry' element={<DetailFoodAngry />}>
            <Route path=":angryId" element={<DetailFoodAngry />} />
        </Route>

        <Route path='/food-details-disgust' element={<DetailFoodDisgust />}>
            <Route path=":disgustId" element={<DetailFoodDisgust />} />
        </Route>

        <Route path='/food-details-fear' element={<DetailFoodFear />}>
            <Route path=":fearId" element={<DetailFoodFear />} />
        </Route>

        <Route path='/food-details-happy' element={<DetailFoodHappy />}>
            <Route path=":happyId" element={<DetailFoodHappy />} />
        </Route>

        <Route path='/food-details-sad' element={<DetailFoodSad />}>
            <Route path=":sadId" element={<DetailFoodSad />} />
        </Route>

        <Route path='/food-details-neutral' element={<DetailFoodNeutral />}>
            <Route path=":neutralId" element={<DetailFoodNeutral />} />
        </Route>

        <Route path='/food-details-surprise' element={<DetailFoodSurprise />}>
            <Route path=":surpriseId" element={<DetailFoodSurprise />} />
        </Route>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();