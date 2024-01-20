const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("audio")) {
      cb(null, "./server/media/audio");
    } else if (file.mimetype.startsWith("image")) {
      cb(null, "./server/media/images");
    } else {
      return;
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
