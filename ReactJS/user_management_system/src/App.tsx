import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './routes/ProtectedRoutes';
import RegisterForm from './pages/RegisterForm';

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
          <DashBoard/>
          </ProtectedRoute>}
          />

      </Routes>
     </Router>
    </>
  )
}

export default App
