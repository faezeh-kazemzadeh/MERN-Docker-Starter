import _ from "lodash";
import asyncHandler from "express-async-handler";
import {
  getUsersService,
  getDeletedUsersService,
  getInactiveUsersService,
  deactivateUserService,
  activateUserService,
  deleteUserService,
  restoreUserService,
  updateUserService,
} from "../services/user.service.js";

//  @Destination    Get Users List
//  @Route          GET /api/users
//  @Access         requiredRoles: ["Admin"]
export const getUsersList = asyncHandler(async (req, res, next) => {
  const users = await getUsersService();
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    users,
  });
});

// @Destination    Get Deleted Users List
// @Route          GET /api/users/deleted
// @Access         requiredRoles: ["Admin"]
export const getDeletedUsersList = asyncHandler(async (req, res, next) => {
  const users = await getDeletedUsersService();
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    users,
  });
});

// @Destination    Get Inactive Users List
// @Route          GET /api/users/deleted
// @Access         requiredRoles: ["Admin"]
export const getInactiveUsersList = asyncHandler(async (req, res, next) => {
  const users = await getInactiveUsersService();
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    users,
  });
});

//  @Destination    Deactivate User
//  @Route          PATCH /api/users/:id
//  @Access         requiredRoles: ["Admin"]
export const deactivateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await deactivateUserService(id);
  res.status(200).json({
    success: true,
    message: "User deactivated successfully",
    user: user,
  });
});

//  @Destination    Deactivate User
//  @Route          PATCH /api/users/:id
//  @Access         requiredRoles: ["Admin"]
export const activateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await activateUserService(id);
  res.status(200).json({
    success: true,
    message: "User activated successfully",
    user: user,
  });
});

//  @Destination    Delete User
//  @Route          PATCH /api/users/:id
//  @Access         requiredRoles: ["Admin"]
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await deleteUserService(id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user: user,
  });
});

//  @Destination    Restore User
//  @Route          Restore /api/users/:id
//  @Access         requiredRoles: ["Admin"]
export const restoreUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await restoreUserService(id);
  res.status(200).json({
    success: true,
    message: "User restored successfully",
    user: user,
  });
});

//  @Destination    Put Update User
//  @Route          PUT /api/users/:id
//  @Access         requiredRoles: ["Admin"]
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await updateUserService(id, updates);
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});
