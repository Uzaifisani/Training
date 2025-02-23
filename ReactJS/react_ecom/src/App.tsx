import { Route, Routes } from 'react-router-dom'
import './App.css'
import {GlobalProvider } from './context/GlobalContext'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import ProductList from './component/ProductList'

function App() {
  return (
    <GlobalProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<ProductList />} />
      </Routes>
    </GlobalProvider>

  )
}

export default App
