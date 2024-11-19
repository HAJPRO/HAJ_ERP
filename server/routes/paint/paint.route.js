const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const DepPaintController = require("../../controllers/paint/paint.controller.js");

const router = express.Router();
router.get("/paint_model", DepPaintController.getModel);
router.post("/paint_confirmed_orders", authMiddleware, DepPaintController.PaintConfirmedOrders);
router.post("/paint_", authMiddleware, DepPaintController.create);
router.delete("/paint_delete/:id", authMiddleware, DepPaintController.delete);
router.put(
  "/paint_edit/:id",
  authMiddleware,
  authorMiddleware,
  DepPaintController.edit
);
router.post(
  "/cancel_reason",
  authMiddleware,
  DepPaintController.cencelReason
);
router.get(
  "/paint_get-one/:id",
  authMiddleware,
  authorMiddleware,
  DepPaintController.getOne
);

module.exports = router;
