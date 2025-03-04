import { useNavigate } from "react-router-dom";
import LoginPage from "../components/Login"
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const LoginForm = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginPage/>
  )
}

export default LoginForm