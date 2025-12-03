import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen p-15 bg-primary flex justify-center overflow-auto custom-scrollbar">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl border border-secondary/10 p-6">
        <div className="w-full pb-4 border-b border-secondary/20 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary tracking-wide">
            Products
          </h1>
        </div>
        <div className="overflow-auto rounded-xl">
          {loaded ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary text-primary h-[60px] text-sm tracking-wide uppercase">
                  <th className="px-6">Product ID</th>
                  <th className="px-6">Image</th>
                  <th className="px-6">Name</th>
                  <th className="px-6">Price</th>
                  <th className="px-6">Labelled Price</th>
                  <th className="px-6">Category</th>
                  <th className="px-6">Stock</th>
                  <th className="px-6">Availability</th>
                  <th className="px-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className="h-[70px] text-secondary text-[15px] bg-primary bg-primary/10 hover:bg-light-green/20 transition-all"
                  >
                    <td className="px-6 font-semibold">{item.productID}</td>

                    <td className="px-6">
                      <img
                        src={item.images[0]}
                        className="w-[50px] h-[50px] rounded-lg shadow-md object-cover border border-secondary/10"
                      />
                    </td>

                    <td className="px-6">{item.name}</td>

                    <td className="px-6 font-semibold text-green">
                      Rs. {item.price}
                    </td>

                    <td className="px-6 text-secondary/70 line-through">
                      Rs. {item.labelledPrice}
                    </td>

                    <td className="px-6">{item.category}</td>

                    <td className="px-6 font-medium">{item.stock}</td>

                    <td className="px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.isAvailable
                            ? "bg-green-100 text-green-700 border border-green-600"
                            : "bg-red-100 text-red-700 border border-red-600"
                        }`}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="px-6">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to="/admin/update-product"
                          className="w-[70px] bg-accent flex justify-center items-center text-primary p-2 rounded-xl cursor-pointer hover:bg-green"
                          state={item}
                        >
                          Edit
                        </Link>
                        <ProductDeleteButton
                          productID={item.productID}
                          reload={() => {
                            setLoaded(false);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Link
        to="/admin/add-product"
        className="fixed right-10 bottom-10 w-[65px] h-[65px] flex justify-center items-center rounded-full shadow-xl bg-accent text-primary hover:bg-green transition-all border-2 border-accent hover:border-green hover:shadow-2xl hover:scale-110"
      >
        <BiPlus size={28} />
      </Link>
    </div>
  );
}
