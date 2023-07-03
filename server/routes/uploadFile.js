const Datastore = require("nedb");
const db = new Datastore({ filename: "./server/data" });
db.loadDatabase();

const uploadFile = (req, res) => {
	const fileData = {
		fileName: req.file.filename,
	};
	db.insert(fileData);
	db.find({}, function (err, docs) {
		res.send(docs);
	});
};

module.exports = { uploadFile };
