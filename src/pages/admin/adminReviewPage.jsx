import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { FaStar } from "react-icons/fa";
import ReviewDeleteButton from "../../components/reviewDeleteButton";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/reviews", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setReviews(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const renderStars = (rating) => (
    <div className="flex text-yellow-500 gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "fill-current" : "text-gray-200"}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen p-15 bg-primary flex justify-center overflow-auto custom-scrollbar">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl border border-secondary/10 p-6">
        <div className="w-full pb-4 border-b border-secondary/20 mb-6">
          <h1 className="text-3xl font-bold text-secondary tracking-wide">
            Reviews Management
          </h1>
        </div>

        <div className="overflow-auto rounded-xl">
          {loaded ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-primary h-[60px] text-sm tracking-wide uppercase">
                  <th className="px-5 text-left">ID</th>
                  <th className="px-5 text-left">Product</th>
                  <th className="px-5 text-left">Customer</th>
                  <th className="px-5 text-left">Rating</th>
                  <th className="px-5 text-left">Comment</th>
                  <th className="px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((item) => (
                  <tr
                    key={item.reviewId}
                    className="h-[80px] text-secondary text-[15px] border-b border-secondary/5 hover:bg-primary/5 transition-all"
                  >
                    <td className="px-6 font-mono text-xs">{item.reviewId}</td>
                    <td className="px-6 font-semibold">{item.productID}</td>
                    <td className="px-6">
                      <div className="flex flex-col">
                        <span className="font-bold">{item.name}</span>
                        <span className="text-xs opacity-60">{item.email}</span>
                      </div>
                    </td>
                    <td className="px-6">{renderStars(item.rating)}</td>
                    <td className="px-6 max-w-[300px] truncate italic">
                      "{item.comment}"
                    </td>
                    <td className="px-6 text-center">
                      <div className="flex justify-center">
                        <ReviewDeleteButton
                          reviewId={item.reviewId}
                          reload={() => setLoaded(false)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
