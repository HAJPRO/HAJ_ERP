const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const DepSpinningController = require("../../controllers/spinning/spinning.controller.js");

const router = express.Router();
router.get("/spinning_model", DepSpinningController.getModel);
router.get("/spinning_all", DepSpinningController.getAll);
router.post("/spinning_create", authMiddleware, DepSpinningController.create);
router.post("/spinning_confirm", DepSpinningController.confirm);
router.delete(
  "/spinning_delete/:id",
  authMiddleware,
  DepSpinningController.delete
);
router.put(
  "/spinning_edit/:id",
  authMiddleware,
  authorMiddleware,
  DepSpinningController.edit
);
router.get(
  "/spinningt_get-one/:id",
  authMiddleware,
  authorMiddleware,
  DepSpinningController.getOne
);

module.exports = router;
