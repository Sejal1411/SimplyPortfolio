import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Main from './components/Main'
import Landing from './components/Landing';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MetricsCard from './components/MetricsCard';
import AddStockForm from './components/AddStockForm';
import StockTable from './components/StockTable';
import { auth } from './Firebase';


function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<Landing name={userName}/>} />
        <Route path="app" element={<Main />} />
        <Route path='/app/login' element={<Login />} />
        <Route path='/app/signup' element={<Signup />} />
        <Route path='/app/dashboard' element={<Dashboard />} />
        <Route path='/app/metrics' element={<MetricsCard />} />
        <Route path='/app/add-stock' element={<AddStockForm />} />
        <Route path='/app/stock-table' element={<StockTable />} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
