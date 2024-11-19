const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const DepProvideController = require("../../controllers/provide/provide.controller.js");

const router = express.Router();
router.post("/provide_all", DepProvideController.getAll);
router.get("/provide_all_length", DepProvideController.getAllLength);
router.post("/provide_create", authMiddleware, DepProvideController.create);
router.delete(
  "/provide_delete/:id",
  authMiddleware,
  DepProvideController.delete
);
router.put(
  "/provide_edit/:id",
  authMiddleware,
  authorMiddleware,
  DepProvideController.edit
);
router.get(
  "/provide_get-one/:id",
  authMiddleware,
  authorMiddleware,
  DepProvideController.getOne
);

module.exports = router;
