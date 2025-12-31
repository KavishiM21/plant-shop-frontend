import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { Link } from "react-router-dom";
import UserData from "./userData";
export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <header className="w-full h-[100px] bg-accent flex relative">
      <LuListCollapse
        onClick={() => {
          setSideBarOpen(true);
        }}
        className="text-primary my-auto text-3xl ml-6 mr-5 md:hidden"
      />
      <img src="/logo.png" alt="Logo" className="h-full ml-5" />

      <div className="w-full h-full hidden lg:flex text-xl font-semibold text-primary justify-center items-center gap-[30px]">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contacts">Contact</Link>
        <Link to="/reviews">Reviews</Link>
      </div>
      <div className="absolute right-30 top-0 h-full items-center hidden md:flex">
        <UserData />
      </div>

      <Link
        to="/cart"
        className="absolute right-4 top-1 bottom-9 translate-y-1/2 text-primary text-3xl mr-3"
      >
        <BiShoppingBag />
      </Link>
      {sideBarOpen && (
        <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">
          <div className="w-[250px] h-screen flex-col relative">
            <div className="absolute w-full h-full bg-primary left-[-250px] translate-x-[250px] transform-flat transition-transform duration-1000 flex flex-col">
              <div className="w-full h-[100px] bg-accent flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className="h-full" />
                <LuListCollapse
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                  className="text-primary my-auto text-3xl ml-6 mr-5 md:hidden rotate-180"
                />
              </div>
              <div className="w-full h-full flex flex-col text-xl text-secondary justify-start items-start  gap-6 mt-10 pl-6">
                <a
                  className="hover:text-secondary transition"
                  href="/"
                  onClick={() => setSideBarOpen(false)}
                >
                  Home
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/products"
                  onClick={() => setSideBarOpen(false)}
                >
                  Products
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/about"
                  onClick={() => setSideBarOpen(false)}
                >
                  About
                </a>
                <a
                  className="hover:text-secondary transition"
                  href="/contacts"
                  onClick={() => setSideBarOpen(false)}
                >
                  Contacts
                </a>
                <div className=" flex justify-center bg-accent p-1 rounded-full">
                  <UserData />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
