import { Route, Routes } from 'react-router-dom'
import './App.css'
import { GlobalProvider } from './context/GlobalContext'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import ViewProduct from './component/ViewProduct'
import Cart from './component/Cart'
import Login from './component/Admin/Login'
import AdminDashboard from './component/Admin/AdminDashboard'
import ProtectedRoute from './context/ProtectedRoute'

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products/:id' element={<ViewProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/admindashboard' element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </GlobalProvider>
  )
}

export default App
