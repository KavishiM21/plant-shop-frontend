import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen p-15 bg-primary flex justify-center overflow-auto custom-scrollbar">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl border border-secondary/10 p-6">
        <div className="w-full pb-4 border-b border-secondary/20 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary tracking-wide">
            Orders
          </h1>
        </div>
        <div className="overflow-auto rounded-xl">
          {loaded ? (
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-secondary text-primary h-[60px] text-sm tracking-wide uppercase">
                  <th className="px-5">Order ID</th>
                  <th className="px-7">Customer Email</th>
                  <th className="px-5">Customer Name</th>
                  <th className="px-5">Date</th>
                  <th className="px-5">Status</th>
                  <th className="px-5">Total Amount</th>
                  <th className="px-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="h-[70px] text-secondary text-[15px] bg-primary bg-primary/10 hover:bg-light-green/20 transition-all"
                  >
                    <td className="px-6 font-semibold">{order.orderId}</td>

                    <td className="px-6">{order.email}</td>

                    <td className="px-6">{order.name}</td>

                    <td className="px-6">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    <td className="px-6 font-semibold">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          order.status === "pending"
                            ? "bg-secondary"
                            : order.status === "processing"
                              ? "bg-gray-500"
                              : order.status === "completed"
                                ? "bg-accent"
                                : order.status === "cancelled"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 font-semibold">
                      LKR. {order.total.toFixed(2)}
                    </td>

                    <td className="px-6">
                      <ViewOrderInfo order={order} />
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
    </div>
  );
}
