import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/component/Sidebar'
import Home from './pages/Home'
import { GlobalProvider } from './context/GlobalContext'
import { useQuery } from '@tanstack/react-query'
import Categories from './pages/Categories'
import ViewProduct from './pages/ViewProduct'
import AdminLogin from './components/component/Admin/AdminLogin'
import AdminDashboard from './components/component/Admin/AdminDashboard'
import ProtectedRoute from './context/ProtectedRoutes'
import AddProduct from './components/component/Admin/AddProduct'
import Cart from './pages/Cart'

function App() {


  return (
    <>
      <GlobalProvider>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path='/products/:id' element={<ViewProduct/>}/>
              <Route path="/admin" element={<AdminLogin/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/adminDashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/addProduct" element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </GlobalProvider>
    </>
  )
}

export default App
