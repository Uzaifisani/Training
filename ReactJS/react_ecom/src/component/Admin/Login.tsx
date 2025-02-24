import { useContext, useState } from "react";
import { IUser } from "../../types";
import { fetchUserData } from "../../services/api";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
    const [userPass, setUserPass] = useState<string>("");
    const { dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

  const getAllUsers = async () => {
    const response: IUser[] = await fetchUserData();
    const adminUser = response.some(user => user.email === userName && user.password === userPass);
      if (!adminUser) {
         dispatch({ type: "LOGOUT" });
        alert("Invalid Credentials");
    } else {
        dispatch({type:"LOGIN"})
          alert("Login Successful");
          navigate("/admindashboard");
    }
  };

  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    getAllUsers();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmitButton}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;