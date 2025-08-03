import api from "../../../core/services/apiClient";

export const signIn = async (credential) => {
  try{
    const response = await api.post("/auth/signin", credential);
  return response.data;
    } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (credential) => {
  const response = await api.post("/auth/signup", credential);
  return response.data;
};

export const signOut = async () => {
  const response = await api.post("/auth/signout");
  return response.data;
};

export const updateProfile = async (credentials) => {
  try {
    const response = await api.put("/auth/profile", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const forgotPassword = async (email) => {
  try {    
    const response = await api.post("/auth/forgot-password", {email});
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const resetPassword = async (credentials) => {
  try {
    const { token, newPassword } = credentials;
    
    const response = await api.put(
      `/auth/reset-password/${token}`,
      { password: newPassword }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const validateToken = async (token) => {
  try {
    const response = await api.get(`/api/auth/validate-token/${token}`);    
    console.log("validate token response:", response);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
