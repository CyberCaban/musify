const express = require("express");
const router = express.Router();

const { uploadFile } = require("./uploadFile");
const { upload } = require("./upload");

router.post("/uploadFile", upload.single("file"), uploadFile);

module.exports = router;
