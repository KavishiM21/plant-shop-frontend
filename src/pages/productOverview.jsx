import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("Loading"); //loading,error,success

  useEffect(() => {
    if (status == "Loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
          setStatus("Success");
        })
        .catch(() => {
          toast.error("Product not found");
          console.log("Error fetching product details: ", error);
          setStatus("Error");
        });
    }
  }, []);
  return (
    <>
      {status == "Loading" && <Loader />}
      {status == "Error" && (
        <h1 className="text-center mt-10 text-2xl" Error loading product></h1>
      )}
      {status == "Success" && (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col md:flex-row bg-primary ">
          <h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white pb-6">
            {product.name}
          </h1>
          <div className="md:w-1/2 w-full h-full flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>
          <div className="md:w-1/2 w-full h-full p-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold hidden md:block">
              {product.name}
            </h1>
            <h2 className="text-xl font-medium text-secondary/60">
              {product.productID}
            </h2>
            <h3 className="text-lg font-medium text-secondary/80 flex items-center">
              <CgChevronRight />
              {product.category}
            </h3>
            <p className="text-md text-justify text-secondary overflow-y-auto">
              {product.description}
            </p>
            <div className="w-full">
              {product.labelledPrice > product.price && (
                <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                  LKR. {product.labelledPrice.toFixed(2)}
                </h2>
              )}
              <h2 className="text-accent font-semibold text-3xl">
                LKR. {product.price.toFixed(2)}
              </h2>
            </div>
            <div className="w-full flex flex-row gap-4 mt-4">
              <button
                onClick={() => {
                  addToCart(product, 1);
                }}
                className="bg-accent text-white px-6 py-3 rounded border border-transparent hover:bg-green-700 hover:text-primary transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: [
                      {
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        image: product.images[0],
                        quantity: 1,
                      },
                    ],
                  });
                }}
                className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-secondary hover:border-transparent hover:text-white transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
