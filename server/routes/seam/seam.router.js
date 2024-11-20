const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const DepSeamWarehouseController = require("../../controllers/seam/warehouse/warehouse.controller.js");

const router = express.Router();
router.get("/image_qrcode", authMiddleware, DepSeamWarehouseController.getQRImage);
router.post("/generate_qrcode", authMiddleware, DepSeamWarehouseController.GenerateQRCode);

module.exports = router;