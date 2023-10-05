import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mypage from './components/Mypage';
import Login from './components/Login';

const App: React.FC = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={`/signup/`} element={<SignUp />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/`} element={<Mypage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;