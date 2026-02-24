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
    "-password -__v",
  );
};

export const deactivateUserService = async (userId) => {
  // const user = await User.findById(userId, { password: 0 });
  // if (!user) throw errorHandler(404, "User not found");
  // if (user.isDeleted) {
  //   throw errorHandler(400, "Cannot deactivate a deleted user.");
  // }
  // if (!user.active)
  //   throw errorHandler(400, "This user has already been deactivated.");

  // user.active = false;
  // return await user.save();

  const user = await User.findOneAndUpdate(
    { _id: userId, isDeleted: false, active: true },
    { $set: { active: false } },
    { new: true, select: "-password -__v" },
  );

  if (!user) {
    throw errorHandler(
      400,
      "User not found, already deleted, or already inactive.",
    );
  }
  return user;
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
  // const user = await User.findById(userId, { password: 0 });
  // if (!user) throw errorHandler(404, "User not found");
  // if (user.isDeleted)
  //   throw errorHandler(400, "This user has already been deleted.");
  // user.isDeleted = true;
  // user.active = false;
  // return await user.save();

  const user = await User.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { $set: { isDeleted: true, active: false } },
    { new: true, select: "-password -__v" },
  );

  if (!user) throw errorHandler(404, "User not found or already deleted.");
  return user;
};

export const restoreUserService = async (userId) => {
  // const user = await User.findById(userId);
  // if (!user) throw errorHandler(404, "User not found");
  // if (!user.isDeleted)
  //   throw errorHandler(
  //     400,
  //     "The user has not been deleted and cannot be restored.",
  //   );
  // user.isDeleted = false;
  // user.active = true;
  // return await user.save();

  const user = await User.findOneAndUpdate(
    { _id: userId, isDeleted: true },
    { $set: { isDeleted: false, active: true } },
    { new: true, select: "-password -__v" },
  );

  if (!user) {
    throw errorHandler(400, "User not found or is not in deleted state.");
  }

  return user;
};

export const updateUserService = async (userId, updates) => {
  // const user = await User.findById(userId);
  // if (!user) throw errorHandler(404, "User not found");

  // const allowedUpdates = [
  //   "firstname",
  //   "lastname",
  //   "email",
  //   "active",
  //   "roles",
  //   "isDeleted",
  // ];
  // const filteredUpdates = _.pick(updates, allowedUpdates);

  // if (_.isEmpty(filteredUpdates)) {
  //   throw errorHandler(400, "No valid fields were submitted for update.");
  // }

  // Object.assign(user, filteredUpdates);

  // return await user.save();

  const allowedUpdates = ["firstname", "lastname", "email", "active", "roles"];
  const filteredUpdates = _.pick(updates, allowedUpdates);

  if (_.isEmpty(filteredUpdates)) {
    throw errorHandler(400, "No valid fields provided.");
  }

  if (filteredUpdates.email) {
    const existingUser = await User.findOne({
      email: filteredUpdates.email,
      _id: { $ne: userId },
    });
    if (existingUser)
      throw errorHandler(400, "Email is already in use by another user.");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: filteredUpdates },
    { new: true, runValidators: true, select: "-password -__v" },
  );

  if (!user) throw errorHandler(404, "User not found.");
  return user;
};
