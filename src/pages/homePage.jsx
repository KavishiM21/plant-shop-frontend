import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import OrdersPage from "./ordersPage";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import ReviewsPage from "./reviews";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./homeContent";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Full Response:", res.data);

          const userData = res.data.user || res.data;
          setCurrentUser(userData);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  if (loadingUser) return <p>Loading user...</p>;

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route
            path="/reviews"
            element={<ReviewsPage currentUser={currentUser} />}
          />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
