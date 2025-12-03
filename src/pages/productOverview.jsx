import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function ProductOverview() {
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
        <div className="w-full h-[calc(100vh-100px)] flex bg-primary ">
          <div className="w-1/2 h-full flex justify-center items-center">
            <img
              src={product.images[0]}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>
          <div className="w-1/2 h-full p-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <p className="text-lg">{product.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
