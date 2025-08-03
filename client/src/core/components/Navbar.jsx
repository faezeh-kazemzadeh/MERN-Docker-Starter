import React from 'react'
import {useAuth} from '../../features/auth/hooks/useAuth'
import { Link } from 'react-router-dom';

const Navbar = ()=> {
    const { isAuthenticated, logout, user } = useAuth();

    const handleLogout = async () => {
        await logout();
    }
  return (
   <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">My App</Link>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {user && <span className="mr-2">Welcome, {user.firstname || user.email}!</span>} {/* نمایش نام یا ایمیل کاربر */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
            {/* <Link to="/signup" className="hover:text-gray-300">Sign Up</Link> */}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
