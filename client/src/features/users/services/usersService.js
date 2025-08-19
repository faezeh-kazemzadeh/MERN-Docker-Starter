import api from "../../../core/services/apiClient";
import { apiWrapper } from "../../../core/services/apiWrapper";

export const getAllUsers = async () => {
    return apiWrapper(() => api.get("/users"));
};

export const getDeletedUsers = async () => {
    return apiWrapper(() => api.get("/users/deleted"));
};

export const getinactiveUsers = async () => {
    return apiWrapper(() => api.get("/users/inactive"));
};

export const deleteUser=async(userId)=>{
    return apiWrapper(()=>api.patch(`/api/users/${userId}/delete`))
}

export const deactivateUser=async(userId)=>{
    return apiWrapper(()=>api.patch(`/api/users/${userId}/deactivate`))
}

export const activateUser=async(userId)=>{
    return apiWrapper(()=>api.patch(`/api/users/${userId}/activate`))
}

export const restoreUser=async(userId)=>{
    return apiWrapper(()=>api.patch(`/api/users/${userId}/restore`))
}

export const updateUser=async(userId,userData)=>{
    return apiWrapper(()=>api.patch(`/api/users/${userId}` , userData))
}