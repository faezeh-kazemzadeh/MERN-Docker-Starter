import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { updateProfileSchema } from "../utils/authValidators";

function MyProfileForm() {
  const navigate = useNavigate();
  const { isAuthenticated, authStatus,authError, updateMyProfile , currentUser } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      firstname: currentUser.firstname ||"",
      lastname: currentUser.lastname||"",
      phone: currentUser.phone|| "",
    },
    validationSchema:updateProfileSchema,
    onSubmit:async(values)=>{
        await updateMyProfile(values)
    }
  });
const isLoading = authStatus === "loading";
  return (
   <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white rounded shadow-md max-w-md">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Update My Profile
      </h2>
        {authError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{authError}</span>
            </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="firstname" className="sr-only">
                First Name
                </label>
                <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                disabled={isLoading}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                    formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                <p className="text-red-500 text-sm mt-1">
                    {formik.errors.firstname}
                </p>
                ) : null}
            </div>
    
            <div>
                <label htmlFor="lastname" className="sr-only">
                Last Name
                </label>
                <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                disabled={isLoading}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                    formik.touched.lastname && formik.errors.lastname
                    ? "border-red-500"
                    : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                <p className="text-red-500 text-sm mt-1">
                    {formik.errors.lastname}
                </p>
                ) : null}
            </div>
    
            <div>
                <label htmlFor="phone" className="sr-only">
                Phone
                </label>
                <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                disabled={isLoading}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                    formik.touched.phone && formik.errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.phone && formik.errors.phone ? (
                <p className="mt-1 text-sm text-red-600">
                    {formik.errors.phone}
                    </p>
                ) : null}
            </div>
   
            <div>
                <button
                type="submit"
                disabled={isLoading || !formik.isValid || !formik.dirty}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading || !formik.dirty || !formik.isValid
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                } transition duration-150 ease-in-out`}
                >
                {isLoading ? "Updating..." : "Update"}
                </button>
            </div>
        </form>


    </div>
    )
}

export default MyProfileForm;
