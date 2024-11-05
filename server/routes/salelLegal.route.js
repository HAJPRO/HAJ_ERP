const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authorMiddleware = require("../middlewares/author.middleware.js");
const saleLegalController = require("../controllers/saleLegal.controller.js");

const router = express.Router();
router.get("/legal_model", saleLegalController.getModel);
router.post("/legal_all", saleLegalController.getAll);
router.post("/legal_create", authMiddleware, saleLegalController.create);
router.delete("/legal_delete/:id", authMiddleware, saleLegalController.delete);
router.post("/legal_confirm", saleLegalController.confirm);
router.post("/legal_export_excel", saleLegalController.export_excel);
router.put(
  "/legal_edit/:id",
  authMiddleware,
  authorMiddleware,
  saleLegalController.edit
);
router.get(
  "/legal_get-one/:id",
  authMiddleware,
  authorMiddleware,
  saleLegalController.getOne
);

module.exports = router;
