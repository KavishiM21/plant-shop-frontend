import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      Product Page
      <Link
        to="/admin/add-product"
        className="absolute right-[10px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center border-2 rounded-full hover:text-primary hover:bg-accent text-accent border-accent"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
