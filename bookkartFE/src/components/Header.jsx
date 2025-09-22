import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { CgMenu } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const { navigate, token, setToken, getCartCount, setcartItems } = useContext(ShopContext);

  const [active, setactive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ state for dropdown

  const toggleMenu = () => setMenuOpened(prev => !prev);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setcartItems({});
    setDropdownOpen(false); // close dropdown on logout
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpened) setMenuOpened(false);
      setactive(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpened]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-blue-100">
      <div className={`${active ? 'bg-blue-100 py-2.5' : 'py-3'} max-w-screen-xl mx-auto px-4 lg:px-12 flex items-center justify-between border-b border-slate-900/10 rounded transition-all duration-300`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://png.pngtree.com/png-vector/20221030/ourmid/pngtree-book-logo-template-vector-illustration-isolated-element-bookstore-vector-png-image_39867726.png"
            alt="logo"
            height={60}
            width={60}
            className="hidden sm:block mr-2"
          />
          <h4 className="text-xl font-bold">Bookkart</h4>
        </Link>

        {/* Navbar */}
        <div className="hidden xl:flex">
          <Navbar containerStyles="flex justify-center gap-x-8 text-sm font-medium px-2 py-1" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-x-3 sm:gap-x-6 relative">
          <CgMenu onClick={toggleMenu} className="text-2xl xl:hidden cursor-pointer" />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="text-3xl bg-white text-primary p-1.5 rounded-full" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow">
              {getCartCount()}
            </span>
          </Link>

          
          {/* Login / User */}
<div className="relative">
  {token ? (
    <HiMiniUserCircle
      className="text-[29px] cursor-pointer"
      onClick={() => setDropdownOpen(prev => !prev)}
    />
  ) : (
    <button
      onClick={() => navigate('/login')}
      className="bg-blue-50 ring-1 ring-white px-6 py-2.5 rounded-full hover:bg-primary transition duration-300 flex items-center gap-x-2"
    >
      Login <FaRegUserCircle />
    </button>
  )}

  {token && dropdownOpen && (
    <ul className="bg-white p-1 w-32 ring-slate-900/5 rounded absolute right-0 top-11 flex flex-col gap-2 text-[14px] font-[400] shadow-md z-50">
      <li onClick={() => navigate('/orders')} className="p-2 text-black rounded-md hover:bg-blue-300 cursor-pointer">
        Orders
      </li>
      <li onClick={logout} className="p-2 text-black rounded-md hover:bg-blue-300 cursor-pointer">
        Logout
      </li>
    </ul>
  )}
</div>


        </div>
      </div>

      {/* Mobile Navbar */}
      {menuOpened && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-md z-40 px-6 py-4">
          <Navbar containerStyles="flex flex-col gap-y-4 text-base font-medium" />
        </div>
      )}
    </header>
  );
};

export default Header;
