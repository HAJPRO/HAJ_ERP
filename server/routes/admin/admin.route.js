const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const onlyAdminAccess = require("../../middlewares/admin.middleware.js");

const PermissionController = require("../../controllers/admin/permission.controller.js");
const RoleController = require("../../controllers/admin/role.controller.js");
const CreateUserController = require("../../controllers/admin/createUser.controller.js");
const {
  permissionAddValidator,
} = require("../../helpers/admin/permissionValidator");

router.post(
  "/add_permission",
  authMiddleware,
  onlyAdminAccess,
  permissionAddValidator,
  PermissionController.addPermission
);
router.post(
  "/store_role",
  authMiddleware,
  onlyAdminAccess,
  permissionAddValidator,
  RoleController.storeRole
);
router.post(
  "/create_user",
  authMiddleware,
  onlyAdminAccess,
  CreateUserController.createUser
);

module.exports = router;
