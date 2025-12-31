import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ReviewDeleteButton({ reviewId, reload }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Review deleted successfully");
        setIsDeleting(false);
        setIsMessageOpen(false);
        reload(); // Re-fetches the list in the parent component
      })
      .catch((err) => {
        toast.error("Failed to delete review");
        console.error(err);
        setIsDeleting(false);
      });
  }

  return (
    <>
      <button
        onClick={() => setIsMessageOpen(true)}
        className="w-[70px] bg-red-500 flex justify-center items-center text-primary p-2 rounded-xl cursor-pointer hover:bg-red-600 transition-colors"
      >
        Delete
      </button>

      {isMessageOpen && (
        <div className="z-[100] w-[100vw] h-screen fixed top-0 left-0 bg-black/55 flex justify-center items-center">
          <div className="w-[600px] h-[300px] bg-primary rounded-xl relative flex flex-col items-center justify-center p-6">
            <button
              onClick={() => setIsMessageOpen(false)}
              className="w-[40px] h-[40px] bg-red-500 rounded-full text-primary text-xl font-bold cursor-pointer hover:bg-red-700 absolute right-[-15px] top-[-15px] shadow-lg"
            >
              X
            </button>

            <h1 className="text-2xl mb-6 text-secondary text-center px-4">
              Are you sure you want to delete review <br />
              <span className="font-mono text-red-500">{reviewId}</span>?
            </h1>

            <div className="w-full flex justify-center gap-10">
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className={`bg-red-500 text-primary px-6 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

              <button
                onClick={() => setIsMessageOpen(false)}
                className="bg-gray-600 text-primary px-6 py-2 rounded-xl cursor-pointer hover:bg-gray-800 transition"
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
