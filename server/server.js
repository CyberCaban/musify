const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

const api = require("./routes/routes");

app.use(express.static(path.resolve("./dist")));
app.use(express.json());

app.use("/api", api);

const start = () => {
	try {
		app.listen(PORT, () => {
			console.log(`started server at ${PORT}`);
		});
		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "../dist/index.html"));
		});
	} catch (e) {
		console.log(e);
	}
};

start();
