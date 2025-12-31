import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          if (res.data.role == "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          toast.success("Login successful!.");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Google Login Failed");
    },
    onNonOAuthError: () => {
      toast.error("Google Login Failed");
    },
  });

  async function login() {
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);
    setIsLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        },
      );

      console.log(res.data.token);

      localStorage.setItem("token", res.data.token);
      console.log();
      if (res.data.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful! Welcome back.");
      setIsLoading(false);
    } catch (err) {
      toast.error("Login failed! Please check your data and try again.");

      console.log("Error during login:");
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
        <div className="w-[450px] h-[500px] backdrop-blur-md shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[50px] font-bold mb-[20px] text-primary">
            Login
          </h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px] text-black bg-transparent
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
            placeholder="Enter your password"
            className="w-full h-[50px] rounded-lg border border-primary p-[10px] text-[20px] text-black
              focus:outline-none 
              focus:border-transparent 
              focus:ring-2 
             focus:ring-secondary
             focus:text-white"
          />
          <p className="text-primary not-italic w-full text-right mb-[20px]">
            Forget your password?{" "}
            <Link to="/forgot-password" className="text-light-green italic">
              Reset it here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] mb-2 bg-accent text-primary font-bold text-[20px] rounded-lg border-[2px] border-primary hover:bg-transparent hover:border-secondary"
          >
            Login
          </button>
          <button
            onClick={googleLogin}
            className="w-full h-[50px]  bg-accent text-primary font-bold text-[20px] rounded-lg border-[2px] border-primary hover:bg-transparent hover:border-secondary"
          >
            Login with <GrGoogle className="inline ml-2 mb-1" />
          </button>
          <p className="text-primary not-italic">
            Don't have an account?{" "}
            <Link to="/register" className="text-light-green italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
