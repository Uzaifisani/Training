import AddProducts from "./AddProducts"
import ManageProduct from "./ManageProduct"

const AdminDashboard = () => {

  return (
      <>
      <h1 className="text-3xl text-center p-2 border-2">Admin Dashboard</h1>
      <AddProducts/>
          <ManageProduct/>
      </>
  )
}

export default AdminDashboard