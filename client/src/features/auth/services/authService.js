import api from "../../../core/services/apiClient";

const handleError = (error) => {
  throw error.response ? error.response.data : new Error(error.message);
};

export const signIn = async (credential) => {
  try {
    const response = await api.post("/auth/signin", credential);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const signUp = async (credential) => {
  try {
    const response = await api.post("/auth/signup", credential);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const signOut = async () => {
  try {
    const response = await api.post("/auth/signout");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProfile = async (credentials) => {
  try {
    const response = await api.put("/auth/profile", credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const resetPassword = async (credentials) => {
  try {
    const { token, newPassword } = credentials;

    const response = await api.put(`/auth/reset-password/${token}`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const validateToken = async (token) => {
  try {
    const response = await api.get(`/auth/validate-token/${token}`);
    console.log("validate token response:", response);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};
