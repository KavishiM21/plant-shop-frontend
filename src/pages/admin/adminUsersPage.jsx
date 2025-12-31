import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen p-15 bg-primary flex justify-center overflow-auto custom-scrollbar">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl border border-secondary/10 p-6">
        <div className="w-full pb-4 border-b border-secondary/20 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-secondary tracking-wide">
            Users
          </h1>
        </div>
        <div className="overflow-auto rounded-xl">
          {loaded ? (
            <table className="w-full border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-secondary text-primary h-[60px] text-sm tracking-wide uppercase">
                  <th className="px-6 text-left">Image</th>
                  <th className="px-6 text-left">Email</th>
                  <th className="px-6 text-left">First Name</th>
                  <th className="px-6 text-left">Last Name</th>
                  <th className="px-6 text-left">Role</th>
                  <th className="px-6 text-left">Status</th>
                  <th className="px-6 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((item, index) => (
                  <tr
                    key={index}
                    className="h-[70px] text-secondary text-[15px] bg-primary/10 hover:bg-light-green/20 transition-all"
                  >
                    <td className="px-6">
                      <img
                        src={item.image}
                        className="w-[55px] h-[55px] rounded-lg shadow-md object-cover border border-secondary/10"
                        alt="user"
                      />
                    </td>

                    <td className="px-6 font-medium text-secondary">
                      <div className="flex items-center gap-2">
                        {item.email}
                        {item.isEmailVerified && (
                          <GoVerified className="text-blue-400" />
                        )}
                      </div>
                    </td>

                    <td className="px-6 text-left">{item.firstName}</td>
                    <td className="px-6 text-left">{item.lastName}</td>
                    <td className="px-6 text-left">{item.role}</td>
                    <td className="px-6 text-left">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.isBlocked
                            ? "bg-red-100 text-red-700 border border-red-600"
                            : "bg-green-100 text-green-700 border border-green-600"
                        }`}
                      >
                        {item.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 text-left">
                      <button
                        className={`px-4 py-1 rounded-lg font-semibold transition-all duration-200 ${
                          item.isBlocked
                            ? "bg-accent hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        onClick={async () => {
                          await axios.put(
                            import.meta.env.VITE_BACKEND_URL +
                              `/users/toggle-block/${item.email}`,
                            {
                              isBlocked: !item.isBlocked,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              },
                            },
                          );
                          setLoaded(false);
                        }}
                      >
                        {item.isBlocked ? "Unblock User" : "Block User"}
                      </button>
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
