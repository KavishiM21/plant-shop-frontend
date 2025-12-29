import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart, getCart } from "../utils/cart";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState(location.state);

  if (location.state == null) {
    navigate("/products");
  }

  function getCartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function submitOrder() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token == null) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }

    const orderItems = [];

    cart.forEach((item) => {
      orderItems.push({
        productID: item.productID,
        quantity: item.quantity,
      });
    });

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/orders",
        {
          name: name,
          address: address,
          phone: phone,
          items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/orders");
      })
      .catch(() => {
        toast.error("Error placing order");
      });
  }

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10 gap-8">
      <div className="w-full lg:w-[60%] bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-secondary mb-4">
          Your Items
        </h2>

        <div className="w-full flex flex-col items-center p-[20px] gap-3">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full md:h-[160px] md:pt-[15px] justify-between pt-[25px] relative bg-white rounded-xl shadow hover:shadow-md transition border border-gray-200 flex p-4 gap-4"
              >
                <h1 className="md:hidden w-full overflow-hidden h-[20px] absolute top-[0px]">
                  {item.name}
                </h1>
                <div className="h-full flex flex-col">
                  <img
                    src={item.image}
                    className="h-[80px] md:h-full w-[120px] rounded-lg object-cover shadow-sm"
                  />
                  <h3 className="md:hidden text-sm text-secondary/80">
                    {item.productID}
                  </h3>

                  {item.labelledPrice > item.price && (
                    <h3 className="md:hidden text-sm text-secondary/60 line-through">
                      LKR. {item.labelledPrice.toFixed(2)}
                    </h3>
                  )}

                  <h2 className="md:hidden text-accent font-bold text-md">
                    LKR. {item.price.toFixed(2)}
                  </h2>
                </div>
                <div className="hidden md:flex flex-col flex-1 justify-between">
                  <h1 className="text-2xl font-medium relative hover:[&_.tooltip]:opacity-100 mb-1">
                    <span className="opacity-0 tooltip italic text-sm absolute bottom-[-35px] bg-accent text-primary px-2 rounded-lg p-2">
                      {item.name}
                    </span>
                    {item.name.length > 20
                      ? item.name.substring(0, 20) + "..."
                      : item.name}
                  </h1>
                  <h3 className="text-md text-secondary/80">
                    ID: {item.productID}
                  </h3>

                  {item.labelledPrice > item.price && (
                    <p className="text-md text-secondary/60 line-through">
                      LKR. {item.labelledPrice.toFixed(2)}
                    </p>
                  )}
                  <p className="text-accent font-bold text-2xl">
                    LKR. {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="min-h-full flex flex-row items-center gap-4">
                  <div className="h-full flex flex-col justify-center items-center bg-primary rounded-xl p-2 shadow-inner">
                    <BsChevronUp
                      onClick={() => {
                        addToCart(item, 1);
                        const newCart = getCart();
                        setCart(newCart);
                      }}
                      className="text-2xl font-extrabold cursor-pointer hover:text-accent transition"
                    />
                    <span className="text-lg ">{item.quantity}</span>
                    <BsChevronUp
                      onClick={() => {
                        addToCart(item, -1);
                        const newCart = getCart();
                        setCart(newCart);
                      }}
                      className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
                    />
                  </div>
                  <span className="md:pr-4 text-xl font-semibold w-[150px] text-right">
                    LKR. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-[60%] bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Details
        </h2>

        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-accent shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-accent shadow-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold text-gray-600">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-accent shadow-sm outline-none min-h-[100px]"
          />
        </div>
      </div>

      <div className="gap-5 w-full lg:w-[60%] bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex justify-between items-center">
        <button
          onClick={submitOrder}
          className="lg:px-10 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-lg shadow-md hover:bg-accent/90 transition"
        >
          Place Order
        </button>

        <span className="lg:text-3xl text-2xl font-bold text-secondary">
          LKR. {getCartTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
}
