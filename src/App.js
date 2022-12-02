import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login'               element={<Login />} />   
        <Route exact path='/'               element={<Login />} />        
        <Route exact path='/register'       element={<Register />} />
        <Route exact path='/forgotpassword'       element={<ForgotPassword />} />
        <Route exact path='/profile'       element={<Profile />} />

      </Routes>
    </Router>
  )
}

export default App
