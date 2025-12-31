import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaEdit, FaTrash, FaRegCommentDots } from "react-icons/fa";
import Loader from "../components/loader";
import toast from "react-hot-toast";

export default function ReviewsPage({ currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // Added for better UX
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchPurchasedProducts();
    fetchReviews();
  }, []);

  async function fetchPurchasedProducts() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const products = res.data.flatMap((order) => order.items);
      const uniqueProducts = Array.from(
        new Map(products.map((p) => [p.productID, p])).values(),
      );
      setPurchasedProducts(uniqueProducts);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching purchased products");
    }
  }

  async function fetchReviews() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setReviews(res.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching reviews");
      setLoaded(true);
    }
  }

  async function submitReview(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!selectedProduct || !rating || !comment) {
      toast.error("Please select product, rating, and comment");
      return;
    }

    setLoading(true);
    try {
      if (editingReviewId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${editingReviewId}`,
          { rating, comment },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Review updated successfully");
        setEditingReviewId(null);
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/reviews`,
          { productID: selectedProduct, rating, comment },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Review submitted successfully");
      }
      setSelectedProduct("");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Error submitting review");
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting review");
    }
  }

  function editReview(review) {
    setEditingReviewId(review.reviewId);
    setSelectedProduct(review.productID);
    setRating(review.rating);
    setComment(review.comment);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  return (
    <div className="w-full min-h-screen bg-primary overflow-x-hidden">
      <div className="w-full h-[350px] relative flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img
          src="/about-banner.png"
          alt="Reviews Banner"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-secondary/80"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Customer Reviews <span className="text-green-400">⭐</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Your opinions help us grow and help other plant parents make better
            choices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 text-green-700 rounded-2xl">
              <FaRegCommentDots size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">
              {editingReviewId
                ? "Refine Your Thoughts"
                : "Share Your Experience"}
            </h2>
          </div>

          <form onSubmit={submitReview} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary/70 ml-2">
                Which plant did you buy?
              </label>
              <select
                className="px-6 py-4 border border-gray-400 bg-gray-50/50 rounded-full outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all appearance-none cursor-pointer"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                disabled={!!editingReviewId}
              >
                <option value="">Select a Product</option>
                {purchasedProducts.map((item) => (
                  <option key={item.productID} value={item.productID}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center py-4 border-gray-400 bg-green-50 rounded-3xl border border-dashed">
              <label className="text-sm font-bold text-secondary/70 mb-3">
                Overall Rating
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={32}
                    className={`cursor-pointer transition-all duration-200 transform ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400 scale-110"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold text-green-700 uppercase tracking-widest">
                {rating > 0 ? `${rating} Stars Selected` : "Click to rate"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary/70 ml-2">
                Your Detailed Feedback
              </label>
              <textarea
                placeholder="What did you love? How was the plant's health upon arrival?"
                className="px-6 py-5 border border-gray-400 bg-gray-50/50 rounded-3xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none h-40"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-max md:px-12 ml-auto py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-800 transition-all hover:scale-[1.02] shadow-xl shadow-green-900/20 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">Processing...</span>
              ) : editingReviewId ? (
                "Update My Review"
              ) : (
                "Post Review"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            What People are Growing
          </h2>
          <div className="h-1.5 w-24 bg-green-600 rounded-full"></div>
        </div>

        {!loaded ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-secondary/50 text-xl font-medium">
              Be the first to leave a review!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.reviewId}
                className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={14}
                      className={`${rev.rating >= star ? "text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>

                <p className="text-secondary/80 italic leading-relaxed mb-6 flex-grow">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-bold text-secondary text-lg">
                      {rev.name}
                    </span>
                    <span className="text-xs text-green-600 font-bold uppercase tracking-tighter">
                      Verified Buyer
                    </span>
                  </div>

                  {currentUser?.email?.toLowerCase() ===
                    rev.email?.toLowerCase() && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => editReview(rev)}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Edit Review"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => deleteReview(rev.reviewId)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Delete Review"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
