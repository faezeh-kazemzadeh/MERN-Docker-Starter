import _ from "lodash";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getUsersService = async () => {
  return await User.find({ isDeleted: false }).select("-password  -__v");
};

export const getDeletedUsersService = async () => {
  return await User.find({ isDeleted: true }).select("-password -__v");
};

export const getInactiveUsersService = async () => {
  return await User.find({ active: false, isDeleted: false }).select(
    "-password -__v"
  );
};

export const deactivateUserService = async (userId) => {
  const user = await User.findById(userId, { password: 0 });
  if (!user) throw errorHandler(404, "User not found");
  if (user.isDeleted) {
    throw errorHandler(400, "Cannot deactivate a deleted user.");
  }
  if (!user.active)
    throw errorHandler(400, "This user has already been deactivated.");

  user.active = false;
  return await user.save();
};

export const activateUserService = async (userId) => {
  const user = await User.findById(userId, { password: 0 });
  if (!user) throw errorHandler(404, "User not found");
  if (user.isDeleted) {
    throw errorHandler(400, "Cannot activate a deleted user.");
  }
  if (user.active)
    throw errorHandler(400, "This user has already been activated.");
  user.active = true;
  return await user.save();
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId, { password: 0 });
  if (!user) throw errorHandler(404, "User not found");
  if (user.isDeleted)
    throw errorHandler(400, "This user has already been deleted.");
  user.isDeleted = true;
  user.active = false;
  return await user.save();
};

export const restoreUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw errorHandler(404, "User not found");
  if (!user.isDeleted)
    throw errorHandler(
      400,
      "The user has not been deleted and cannot be restored."
    );
  user.isDeleted = false;
  user.active = true;
  return await user.save();
};

export const updateUserService = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw errorHandler(404, "User not found");

  const allowedUpdates = [
    "firstname",
    "lastname",
    "email",
    "active",
    "roles",
    "isDeleted",
  ];
  const filteredUpdates = _.pick(updates, allowedUpdates);

  if (_.isEmpty(filteredUpdates)) {
    throw errorHandler(400, "No valid fields were submitted for update.");
  }

  Object.assign(user, filteredUpdates);

  return await user.save();
};
