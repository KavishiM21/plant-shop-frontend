import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminAddProductPage() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in as admin to add products");
      navigate("/login");
      return;
    }
    if (productID == "" || name == "" || category == "" || description == "") {
      toast.error("Please fill all the required fields");
      return;
    }
    try {
      const altNamesInArray = altNames.split(",");
      const imagesInArray = images.split(",");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/products/",
        {
          productID: productID,
          name: name,
          altNames: altNamesInArray,
          description: description,
          price: price,
          labelledPrice: labelledPrice,
          images: imagesInArray,
          category: category,
          stock: stock,
          isAvailable: isAvailable,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Error adding product, Please try again");
      console.log("Error adding product");
      console.log(err);
    }
  }
  return (
    <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll">
      <div className="w-[800px] h-auto bg-accent/60 rounded-2xl p-[40px] overflow-y-visible">
        <h1 className="w-full text-2xl font-semibold mb-[30px] text-secondary flex items-center gap-[5px]">
          <AiOutlineProduct />
          Add New Product
        </h1>
        <div className="w-full bg-primary p-[20px] rounded-xl flex flex-wrap justify-between">
          <div className="my-[10px] w-[45%]">
            <label>Product ID</label>
            <input
              type="text"
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
            <p className="text-sm text-secondary w-full text-right">
              Prodive a unique Product ID
            </p>
          </div>
          <div className="my-[10px] w-[45%]">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
          </div>
          <div className="my-[10px] w-[45%]">
            <label>Alternative Names</label>
            <input
              type="text"
              value={altNames}
              onChange={(e) => {
                setAltNames(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
            <p className="text-sm text-secondary w-full text-right">
              Separate multiple names with commas
            </p>
          </div>
          <div className="my-[10px] flex flex-col w-[45%]">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            >
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Roses">Roses</option>
              <option value="Air Plants">Air Plants</option>
              <option value="Fruit Plants">Fruit Plants</option>
              <option value="IVegetable Plants">Vegetable Plants</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="my-[10px] w-[45%]">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
          </div>
          <div className="my-[10px] w-[45%]">
            <label>labelled Price</label>
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => {
                setLabelledPrice(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
          </div>
          <div className="my-[10px] w-full">
            <label>Images</label>
            <textarea
              type="text"
              value={images}
              onChange={(e) => {
                setImages(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px] py-[10px]"
            />
          </div>
          <div className="my-[10px] w-full">
            <label>Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px] py-[10px]"
            />
          </div>
          <div className="my-[10px] w-[45%]">
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            />
          </div>
          <div className="my-[10px] items-center gap-[10px] w-[45%]">
            <label>Available</label>
            <select
              value={isAvailable}
              onChange={(e) => {
                setIsAvailable(e.target.value);
              }}
              className="w-full h-[40px] rounded-2xl border border-accent focus:outline-none focus:ring-2 focus:ring-accent px-[20px]"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <Link
            to="/admin/products"
            className="w-[49%] h-[50px] bg-red-600 text-primary font-bold rounded-xl flex justify-center items-center border-[2px] border-primary transition-all duration-200 hover:bg-red-300 hover:text-secondary mt-[10px] mb-[10px]"
          >
            Cancel
          </Link>
          <button
            onClick={addProduct}
            className="w-[49%] h-[50px] bg-accent text-primary font-bold rounded-xl border-[2px] border-primary hover:bg-accent/50 hover:text-secondary mt-[10px] mb-[10px]"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
