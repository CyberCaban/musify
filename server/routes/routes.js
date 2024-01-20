const express = require("express");
const router = express.Router();

const { uploadFile } = require("./uploadFile");
const { upload } = require("./upload");
const { getAllImages } = require("./controller");

router.post("/uploadFile", upload.single("file"), uploadFile);
router.post("/getAllImages", getAllImages);

module.exports = router;
