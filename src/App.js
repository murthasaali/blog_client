import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store'; // Import the Redux store
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import {Toaster} from 'react-hot-toast'
// Import your components and pages
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import HomeLanding from './Home/HomeLanding';

function App() {

  
  return (
    <Provider store={store}>
            <Toaster /> 

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomeLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
