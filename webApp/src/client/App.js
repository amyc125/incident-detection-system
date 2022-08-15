import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import About from './components/About';
import Navbar from './components/Navbar';
import UsersPage from './UsersPage';
import SearchPage from './SearchPage';
import AlertPage from './AlertPage';

const App = () => {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/alerts" element={<AlertPage />} />
        </Routes>
    </div>
  );
};

export default App;
