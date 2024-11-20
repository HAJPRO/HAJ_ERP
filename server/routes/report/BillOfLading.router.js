const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorMiddleware = require("../../middlewares/author.middleware.js");
const ReportController = require("../../controllers/report/report.controller.js");

const router = express.Router();
router.post("/generate_pdf", ReportController.Generate);
router.get("/report", ReportController.Get);


module.exports = router;
