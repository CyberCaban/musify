const { prisma } = require("../../prisma/prisma-client");
const { verifyRefreshToken } = require("../service/tokenService");

const uploadFile = async (req, res) => {
	try {
		console.log(req.body.newName);
		const name = req.body.newName;

		const { refreshToken } = req.cookies;
		const email = verifyRefreshToken(refreshToken).payload;

		const user = await prisma.user.findFirst({ where: { email } });

		const test = await prisma.track.create({
			data: {
				filename: req.file.filename,
				title: name,
				author: { connect: { email } },
			},
		});
		console.log(test);

		return res.json({ user });
	} catch (e) {
		console.log(e);
	}
};

module.exports = { uploadFile };
