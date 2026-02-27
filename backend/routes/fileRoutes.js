const express = require("express");
const router = express.Router();
const { explainFileContent } = require("../controllers/fileController");

router.post("/explain", explainFileContent);

module.exports = router;
