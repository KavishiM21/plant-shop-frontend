import { Link, Route, Routes } from "react-router-dom";
import { LuClipboardList } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function adminPage() {
  return (
    <div className="w-full h-full flex bg-accent">
      <div className="w-[300px] bg-accent h-full">
        <div className="w-full h-[100px] flex items-center text-primary">
          <img src="/logo.png" alt="Logo" className="h-full mr-5" />
          <h1 className="text-2xl">Admin</h1>
        </div>
        <div className="w-full h-[400px] text-primary text-2xl flex flex-col pt-[20px] pl-[20px]">
          <Link
            to="/admin"
            className="w-full flex items-center h-[50px] gap-[10px]"
          >
            <LuClipboardList />
            Orders
          </Link>
          <Link
            to="/admin/products"
            className="w-full flex items-center h-[50px] gap-[10px]"
          >
            <LuBoxes />
            Products
          </Link>
          <Link
            to="/admin/users"
            className="w-full flex items-center h-[50px] gap-[10px]"
          >
            <FiUsers />
            Users
          </Link>
          <Link
            to="/admin/reviews"
            className="w-full flex items-center h-[50px] gap-[10px]"
          >
            <MdOutlineRateReview />
            Reviews
          </Link>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-10 rounded-3xl border-accent overflow-y-scroll">
        <Routes path="/">
          <Route path="/" element={<h1>Orders</h1>} />
          <Route path="/products" element={<AdminProductPage />} />
          <Route path="/add-product" element={<AdminAddProductPage />} />
          <Route path="/update-product" element={<AdminUpdateProductPage />} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/reviews" element={<h1>Reviews</h1>} />
        </Routes>
      </div>
    </div>
  );
}
