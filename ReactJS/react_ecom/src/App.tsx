import { Route, Routes } from 'react-router-dom'
import './App.css'
import {GlobalProvider } from './context/GlobalContext'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import ViewProduct from './component/ViewProduct'
import Cart from './component/Cart'
// import ProductList from './component/ProductList'

function App() {
  return (
    <GlobalProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products/:id' element={<ViewProduct />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </GlobalProvider>

  )
}

export default App
