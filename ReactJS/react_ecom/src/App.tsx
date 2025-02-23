import { Route, Routes } from 'react-router-dom'
import './App.css'
import {GlobalProvider } from './context/GlobalContext'
import Navbar from './component/Navbar'

function App() {


  return (
    <GlobalProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<h2>Home</h2>}/>
      </Routes>
    </GlobalProvider>

  )
}

export default App
