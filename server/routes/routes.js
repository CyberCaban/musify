const express = require("express");
const router = express.Router();

const { uploadFile } = require("./uploadFile");
const { upload } = require("./upload");
const { clearDB } = require("./cleardb");

router.post("/uploadFile", upload.single("file"), uploadFile);
router.post("/clearDB", clearDB);

module.exports = router;
