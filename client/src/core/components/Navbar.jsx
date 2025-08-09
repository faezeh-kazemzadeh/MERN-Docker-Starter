import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
    const { isAuthenticated, logout, currentUser } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const dropdownRef = useRef(null); 

    const handleLogout = async () => {
        await logout();
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">My App</Link>
            <div className="relative" ref={dropdownRef}>
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <span className="mr-2">Welcome, {currentUser.firstname || currentUser.email}!</span>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="focus:outline-none"
                            >
                                <FaUserCircle size={30} className="text-gray-400 hover:text-white transition duration-300" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="border-t border-gray-600 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                                    >
                                        Logout
                                    </button>
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
        </nav>
    );
};

export default Navbar;