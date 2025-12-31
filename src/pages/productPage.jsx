import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        });
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/categories/list")
        .then((res) => setCategories(res.data));
    }
  }, []);

  async function filterProducts(category, min, max) {
    // setLoaded(false);
    try {
      const params = {};
      if (category) params.category = category;
      if (min) params.minPrice = min;
      if (max) params.maxPrice = max;

      const url = Object.keys(params).length
        ? import.meta.env.VITE_BACKEND_URL + "/products/filter"
        : import.meta.env.VITE_BACKEND_URL + "/products";

      const response = await axios.get(url, { params });
      setProducts(response.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      toast.error("Error filtering products. Try again later");
      setLoaded(true);
    }
  }

  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {!loaded ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-[80px] sticky top-0 bg-white flex items-center gap-4 px-6 mb-4 shadow-md z-10">
            <div className="relative flex-1 ml-15">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-lg" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-[500px] pl-12 pr-4 py-2 border bg-primary border-secondary/30 rounded-full outline-none 
                focus:ring-1 focus:border-accent/60 transition"
                onChange={async (e) => {
                  setLoaded(false);
                  const query = e.target.value.trim();
                  try {
                    const response = query
                      ? await axios.get(
                          import.meta.env.VITE_BACKEND_URL +
                            "/products/search/" +
                            query,
                        )
                      : await axios.get(
                          import.meta.env.VITE_BACKEND_URL + "/products",
                        );
                    setProducts(response.data);
                  } catch (err) {
                    console.error(err);
                    toast.error("Error searching products");
                  }
                  setLoaded(true);
                }}
              />
            </div>

            <select
              value={selectedCategory}
              className="px-5 py-2 border bg-primary border-secondary/30 rounded-full outline-none 
                focus:ring-1 focus:border-accent/60 transition"
              onChange={async (e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                await filterProducts(value, minPrice, maxPrice);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              className="w-[100px] px-3 py-2 border bg-primary border-secondary/30 rounded-full outline-none 
                focus:ring-1 focus:border-accent/60 transition"
              onChange={async (e) => {
                const value = e.target.value;
                setMinPrice(value);
                await filterProducts(selectedCategory, value, maxPrice);
              }}
            />

            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              className="w-[100px] px-3 py-2 border bg-primary border-secondary/30 rounded-full outline-none 
                focus:ring-1 focus:border-accent/60 transition"
              onChange={async (e) => {
                const value = e.target.value;
                setMaxPrice(value);
                await filterProducts(selectedCategory, minPrice, value);
              }}
            />
          </div>

          {/* Product Cards */}
          <div className="w-full flex justify-center p-4 flex-row flex-wrap">
            {products.map((item) => (
              <ProductCard key={item.productID} product={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
