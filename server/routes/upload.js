const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./server/media");
	},
	filename: function (req, file, cb) {
		const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueName + "-" + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "audio/aac" ||
			file.mimetype == "audio/mpeg" ||
			file.mimetype == "audio/ogg" ||
			file.mimetype == "audio/opus" ||
			file.mimetype == "audio/wav" ||
			file.mimetype == "audio/webm" ||
			file.mimetype == "audio/3gpp" ||
			file.mimetype == "audio/3gpp2" ||
			file.mimetype == "audio/mp3"
		) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});

module.exports = { upload };
