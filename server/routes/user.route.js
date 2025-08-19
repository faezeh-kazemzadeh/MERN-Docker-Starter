import express from "express";

import { verifyToken, authorize } from "../middleware/auth.middleware.js";
import {
  getUsersList,
  getDeletedUsersList,
  getInactiveUsersList,
  deactivateUser,
  activateUser,
  deleteUser,
  restoreUser,
  updateUser
} from "../controllers/user.controller.js";

const router = express.Router();
router.use(verifyToken, authorize(["admin"]));

router.get("/", getUsersList);
router.get("/deleted", getDeletedUsersList);
router.get("/inactive", getInactiveUsersList);
router.patch("/:id/deactivate" , deactivateUser)
router.patch("/:id/activate", activateUser)
router.patch("/:id/delete", deleteUser);
router.patch("/:id/restore",restoreUser)
router.patch("/:id", updateUser)
export default router;
