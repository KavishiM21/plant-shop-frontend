import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login() {
    console.log("Login button clicked");
    console.log("Email", email);
    console.log("Password", password);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        },
      );
      console.log(res);
      if ((res.data.role = "admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast("Login successful!");
    } catch (err) {
      toast("Login Failed! Check your email and password");
      console.log("Error during login!");
      console.log(err);
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
        <h1 className="text-[50px] text-primary text-center text-shadow-md text-shadow-secondary font-bold">
          Bringing Nature Closer to You
        </h1>
        <p className="text-[30px] text-secondary text-center text-shadow-md text-shadow-primary italic">
          Nature's beauty, delivered to your space.
        </p>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[550px] backdrop-blur-md shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[50px] font-bold mb-[20px] text-primary text-shadow-md text-shadow-secondary">
            Login
          </h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
            className="w-full h-[50px] mb-[20px] rounded-lg border border-primary p-[10px] text-[20px] 
               focus:outline-none 
               focus:border-transparent 
               focus:ring-2 
               focus:ring-secondary
               focus:text-primary"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your password"
            className="w-full h-[50px] rounded-lg border border-primary p-[10px] text-[20px] 
              focus:outline-none 
              focus:border-transparent 
              focus:ring-2 
             focus:ring-secondary
             focus:text-primary"
          />
          <p className="text-primary not-italic w-full text-right mb-[20px]">
            Forget your password?{" "}
            <Link to="/register" className="text-green-200 italic">
              Reset it here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] bg-accent text-secondary font-bold text-[20px] rounded-lg border-[2px] border-primary hover:bg-transparent hover:text-primary hover:border-secondary"
          >
            Login
          </button>
          <p className="text-primary not-italic">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-200 italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
