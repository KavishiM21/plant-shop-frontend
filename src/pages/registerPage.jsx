import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
    if (firstName.trim() == "") {
      toast.error("First name is required");
      return;
    }
    if (lastName.trim() == "") {
      toast.error("Last name is required");
      return;
    }
    if (email.trim() == "") {
      toast.error("Email is required");
      return;
    }
    if (password.trim() == "") {
      toast.error("Password is required");
      return;
    }

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      console.log();
      navigate("/login");

      toast.success("Registration successful! Welcome to Leaf and Bloom");
      setIsLoading(false);
    } catch (err) {
      toast.error("Registration failed! Please check your data and try again.");
      console.log(err);
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full h-screen bg-[url('/bg-login_1.png')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex justify-center items-center flex-col">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[250px] h-[250px] object-cover"
        />
        <h1 className="text-[50px] text-green text-center font-bold">
          Bringing Nature Closer to You
        </h1>
        <p className="text-[30px] text-secondary text-center font-semibold italic">
          Nature's beauty, delivered to your space.
        </p>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-md shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[50px] font-semibold mt-[-10px] mb-[10px] text-primary">
            Register
          </h1>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="First name"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px]  text-black bg-transparent
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-white"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Last name"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px]  text-black bg-transparent
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-white"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px]  text-black bg-transparent
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-white"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px]  text-black bg-transparent
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-white"
          />
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            placeholder="Confirm password"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px]  text-black bg-transparent
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-white"
          />
          <button
            onClick={register}
            className="w-full h-[50px] bg-accent text-primary font-bold text-[20px] rounded-lg border-[2px] border-primary hover:bg-transparent hover:border-secondary"
          >
            Register
          </button>
          <p className="text-primary not-italic">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary italic">
              Login here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
