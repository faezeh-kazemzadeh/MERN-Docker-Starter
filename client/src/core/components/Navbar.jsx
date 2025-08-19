import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Navbar = () => {
    const { isAuthenticated, logout, currentUser } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isArticlesSubmenuOpen, setIsArticlesSubmenuOpen] = useState(false); // State برای زیرمنو
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsArticlesSubmenuOpen(false); // بستن زیرمنو هنگام باز کردن منوی کاربری
    };
    
    const toggleArticlesSubmenu = () => {
        setIsArticlesSubmenuOpen(!isArticlesSubmenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsArticlesSubmenuOpen(false); // بستن زیرمنو هنگام بستن منوی موبایل
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="bg-gray-800 p-4 text-white relative">
            <div className="container mx-auto flex justify-between items-center">
                 <div className="flex items-center space-x-6">
                  <Link to="/" className="text-xl font-bold">My App</Link>            

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/products" className="hover:text-gray-300 transition-colors duration-200">Products</Link>
                    
                    <div className="relative">
                        <button onClick={toggleArticlesSubmenu} className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                            Articles 
                            {isArticlesSubmenuOpen ? <FaChevronUp className="ml-1" size={12} /> : <FaChevronDown className="ml-1" size={12} />}
                        </button>
                        {isArticlesSubmenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                                <Link to="/articles/category-1" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={() => setIsArticlesSubmenuOpen(false)}>Category 1</Link>
                                <Link to="/articles/category-2" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={() => setIsArticlesSubmenuOpen(false)}>Category 2</Link>
                                <Link to="/articles/all" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={() => setIsArticlesSubmenuOpen(false)}>All Articles</Link>
                            </div>
                        )}
                    </div>
                    
                    <Link to="/about" className="hover:text-gray-300 transition-colors duration-200">About Us</Link>
                    <Link to="/contact" className="hover:text-gray-300 transition-colors duration-200">Contact</Link>
                </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <div className="relative hidden md:block" ref={dropdownRef}>
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <span className="mr-2">Welcome, {currentUser.firstname || currentUser.email}!</span>
                            <div className="relative">
                                <button onClick={toggleDropdown} className="focus:outline-none">
                                    <FaUserCircle size={30} className="text-gray-400 hover:text-white transition duration-300" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
                                        <div className="border-t border-gray-600 my-1"></div>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600">Logout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
                        </div>
                    )}
                </div>
                </div>
            </div>

            <div className={`md:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4 transition-all duration-300 z-50 ${isMobileMenuOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                <Link to="/products" className="block py-2 hover:bg-gray-700" onClick={() => {setIsMobileMenuOpen(false); setIsArticlesSubmenuOpen(false);}}>Products</Link>
                
                <div className="block py-2">
                    <button onClick={toggleArticlesSubmenu} className="flex items-center w-full justify-between hover:bg-gray-700 p-2 rounded">
                        <span>Articles</span>
                        {isArticlesSubmenuOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </button>
                    {isArticlesSubmenuOpen && (
                        <div className="pl-4 border-l border-gray-600 mt-2">
                            <Link to="/articles/category-1" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Category 1</Link>
                            <Link to="/articles/category-2" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Category 2</Link>
                            <Link to="/articles/all" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>All Articles</Link>
                        </div>
                    )}
                </div>

                <Link to="/about" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                <Link to="/contact" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <div className="border-t border-gray-700 my-2"></div>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                        <Link to="/dashboard" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                        <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-red-400 hover:bg-gray-700">Logout</button>
                    </>
                ) : (
                    <Link to="/signin" className="block py-2 hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;