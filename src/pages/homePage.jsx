import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

export default function adminPage() {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
