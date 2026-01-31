import React, { useState, useEffect } from 'react';
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {user, setUser, isSeller, setisSeller, setShowUserLogin, navigate, 
    setSearchQuery, searchQuery, cartItemCount, axios} = useAppContext();
  

  // Handle scroll effect for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('/api/users/logout', {withCredentials: true});
      if(data.success){
        toast.success(data.message);
        setUser(null);

        // ⏱️ wait for state update to settle
        setTimeout(() => navigate("/"), 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0){
      navigate("/products");
    }
  }, [searchQuery]);

  const navLinks = [
    { name: "Shop All", path: "/products" },
    { name: "Doshas", path: "/" },
    { name: "Wellness", path: "/" },
    { name: "About Us", path: "/" },
  ];

  return (
    <div className="w-full font-sans text-stone-800">
      
      {/* 1. Top Announcement Bar - Crucial for E-commerce sales */}
      <div className="bg-emerald-900 text-emerald-50 text-xs text-center py-2 font-medium tracking-wide">
        🌿 Free Shipping on all orders above ₹999 | 100% Organic & Natural
      </div>

      {/* Main Navbar */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-[#fcfaf8] ${
          scrolled ? 'shadow-lg py-3' : 'border-b border-stone-200 py-5'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-24">
          
          {/* Logo Section */}
          <NavLink to='/' onClick={()=>setOpen(false)} className="flex items-center gap-2 group">
             {/* <img className='h-9' src={assets.logo} alt="PrakrtiVeda Logo" /> */}
             <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-emerald-800 tracking-tight group-hover:text-emerald-700 transition">
                  Prakrti<span className="text-amber-600">Veda</span>
                </span>
                <span className="hidden sm:block px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Est. 2025
                </span>
             </div>
          </NavLink>

          <div className="flex items-center gap-6 lg:hidden">
            {/* Cart Icon with Badge */}
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
              <svg className="w-6 h-6 text-stone-600 group-hover:text-emerald-700 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-amber-600 text-white text-[10px] font-bold rounded-full border-2 border-[#fcfaf8]">
                {cartItemCount()}
              </span>
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu" 
              className="p-2 text-emerald-900 hover:bg-stone-100 rounded-md transition"
            >
              {open ? (
                // Close Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                // Hamburger Icon (Styled)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-stone-600">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="hover:text-emerald-700 transition relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-600 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions (Search, Cart, Login) */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Search Bar - Expanded */}
            <div className="flex items-center bg-white border border-stone-300 rounded-full px-4 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all w-64 shadow-sm">
              <input 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm placeholder-stone-400 text-stone-700" 
                type="text" 
                placeholder="Search herbs, medicines..." 
              />
              <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-4">
               {/* Cart Icon with Badge */}
              <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                <svg className="w-6 h-6 text-stone-600 group-hover:text-emerald-700 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-amber-600 text-white text-[10px] font-bold rounded-full border-2 border-[#fcfaf8]">
                  {cartItemCount()}
                </span>
              </div>

              {/* Login/LogOut Button */}
              {!user ? (
                // 🔐 Not Logged In
                <button
                  onClick={() => setShowUserLogin(true)}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Login / Register
                </button>
              ) : (
                // 👤 Logged In
                <div className="relative group">
                  <button className="px-5 py-2 bg-emerald-800 text-white text-sm font-medium rounded-full">
                    My Account
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-stone-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    
                    <NavLink
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50"
                    >
                      My Orders
                    </NavLink>

                    <NavLink
                      to="/favourites"
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50"
                    >
                      Favourites
                    </NavLink>

                    <button
                      onMouseDown={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Animated) */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} origin-top`}>
          <div className="px-6 py-4 bg-white border-t border-stone-100 shadow-inner flex flex-col gap-4">
             {/* Mobile Search */}
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
               <svg className="w-4 h-4 text-stone-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               <input className="w-full bg-transparent outline-none text-sm" type="text" placeholder="Search..." />
            </div>

            <NavLink to='/products' className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={()=>setOpen(false)}>Shop All</NavLink>
            <NavLink to='/' className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={()=>setOpen(false)}>Doshas</NavLink>
            <NavLink to='/' className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={()=>setOpen(false)}>Wellness Blog</NavLink>
            <NavLink to='/' className="text-stone-700 font-medium py-2 border-b border-stone-100" onClick={()=>setOpen(false)}>Contact</NavLink>
            
            {!user ? (
              <button
                onClick={() => {
                  setShowUserLogin(true);
                  setOpen(false);
                }}
                className="w-full py-3 mt-2 bg-emerald-800 text-white rounded-lg font-medium shadow-sm"
              >
                Login / Register
              </button>
            ) : (
              <>
                <NavLink
                  to="/my-orders"
                  onClick={() => setOpen(false)}
                  className="text-stone-700 font-medium py-2 border-b border-stone-100"
                >
                  My Orders
                </NavLink>

                <NavLink
                  to="/favourites"
                  onClick={() => setOpen(false)}
                  className="text-stone-700 font-medium py-2 border-b border-stone-100"
                >
                  Favourites
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full py-3 mt-2 bg-red-600 text-white rounded-lg font-medium shadow-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
