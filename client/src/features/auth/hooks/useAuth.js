import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signIn,
  signUp,
  signOut,
  forgotPassword,
  resetPassword,
  updateProfile,
  clearAuth,
} from "../redux/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, error, isLoading, successMessage } = useSelector(
    (state) => state.auth
  );

  const isAuthenticated = !!currentUser;
  const userId = currentUser ? currentUser._id : null;
  const authStatus = isLoading
    ? "loading"
    : error
    ? "failed"
    : successMessage
    ? "succeeded"
    : "idle";
  const authError = error?.message || error || null;
  const authSuccessMessage = successMessage || null;

  const login = useCallback(
    async (credentials) => {
      await dispatch(signIn(credentials));
    },
    [dispatch]
  );

  const register = useCallback(
    async (credentials) => {
      await dispatch(signUp(credentials));
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await dispatch(signOut());
    navigate("/signin", { replace: true });
  }, [dispatch]);

  const requestPasswordResetLink = useCallback(
    async (email) => {
      await dispatch(forgotPassword(email));
    },
    [dispatch]
  );

  const resetUserPassword = useCallback(
    async (credentials) => {
      const payload = {
        token: credentials.token,
        newPassword: credentials.newPassword,
      };
      await dispatch(resetPassword(payload));
    },
    [dispatch]
  );

  const updateMyProfile =useCallback(
    async( payload)=>{
      await dispatch(updateProfile(payload))
    },[dispatch]
  )

  const clearAuthMessages = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  
  return {
    currentUser,
    isAuthenticated,
    userId,
    authStatus,
    authError,
    authSuccessMessage,
    login,
    register,
    logout,
    requestPasswordResetLink,
    resetUserPassword,
    updateMyProfile,
    clearAuthMessages,
  };
};

export default useAuth;