import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import Heder from './components/Header'
import Singup from './pages/Singup'

import Login from './pages/Login'
import { useAuthStore } from './store/auth.store'
import Loader from './components/Loader'
import { ThemeContext } from './ThemeContext'

function App() {

  const { user, checkAuth , isLoading } = useAuthStore();
    const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    checkAuth();
  } , [])

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [darkMode]);




if(isLoading){
 return  <Loader/>
}

  return (

    <>
      <Heder toggleTheme={toggleTheme} darkMode={darkMode}/>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/signup' element={user ? <Home /> : <Singup />} />
        <Route path='/login' element={user ? <Home /> : <Login/>} />

      </Routes>
      <Toaster />
    </>
  )

}

export default App
