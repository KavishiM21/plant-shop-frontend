import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteButton(props) {
  const productID = props.productID;
  const reload = props.reload;
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsDeleting(false);
        setIsMessageOpen(false);
        reload();
      })
      .catch(() => {
        toast.error("Failed to delete product");
        setIsDeleting(false);
      });
  }

  return (
    <>
      <button
        onClick={() => {
          setIsMessageOpen(true);
        }}
        className="w-[70px] bg-red-500 flex justify-center items-center text-primary p-2 rounded-xl cursor-pointer hover:bg-red-700"
      >
        Delete
      </button>

      {isMessageOpen && (
        <div className="w-[100vw] h-screen fixed top-0 left-0 bg-black/55 flex justify-center items-center">
          <div className="w-[600px] h-[300px] bg-primary rounded-xl relative flex flex-col items-center justify-center">
            <button
              onClick={() => {
                setIsMessageOpen(false);
              }}
              className="w-[40px] h-[40px] bg-red-600 rounded-full text-primary text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-32px] top-[-32px]"
            >
              X
            </button>

            <h1 className="text-2xl mb-6 text-secondary text-center">
              Are you sure, want to delete this product {productID}?
            </h1>

            <div className="w-full flex justify-center gap-10">
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="bg-red-600 text-primary px-4 py-2 rounded-xl cursor-pointer hover:bg-red-800 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setIsMessageOpen(false)}
                className="bg-gray-600 text-primary px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
