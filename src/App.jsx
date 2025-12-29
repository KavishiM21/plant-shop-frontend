import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

//"947978453608-1rqnfighi7tsir80usv0cm548lqcubv9.apps.googleusercontent.com"

function App() {
  return (
    <GoogleOAuthProvider clientId="947978453608-1rqnfighi7tsir80usv0cm548lqcubv9.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="w-full h-screen bg-primary text-secondary">
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
