import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import AddProducts from "./AddProducts"
import ManageProduct from "./ManageProduct"

const AdminDashboard = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="admin-dashboard p-2 m-2">
      <div className="header flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-base font-medium py-2 px-4 rounded-xl shadow-md transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <AddProducts/>
      <ManageProduct/>
    </div>
  );
};

export default AdminDashboard;