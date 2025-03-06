import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './routes/ProtectedRoutes';
import RegisterForm from './pages/RegisterForm';
import ViewUser from './components/users/ViewUsers';
import AddUser from './components/users/AddUser';
import User from './pages/User';


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>}
          />
          <Route path='/dashboard/users' element={
            <ProtectedRoute>
              <User/>
            </ProtectedRoute>}
          />
          <Route path='/users/:id' element={
            <ProtectedRoute>
              <ViewUser />
            </ProtectedRoute>}
          />
          <Route path='/adduser' element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
