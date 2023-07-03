const fs = require("fs");

const clearDB = async (req, res) => {
	fs.truncate("./server/data", (err) => {
		if (err) throw err;
	});
	fs.readdir("./server/media", (err, files) => {
		if (err) throw err;
		for (let file of files) {
			fs.unlink(`./server/media/${file}`, (err) => {
				if (err) throw err;
			});
		}
	});
};

module.exports = { clearDB };
