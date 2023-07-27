const { prisma } = require("../../prisma/prisma-client");
const jwt = require("jsonwebtoken");

const generateTokens = (payload) => {
	const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "24h",
	});
	const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "30d",
	});
	return { accessToken, refreshToken };
};

const saveToken = async (userID, refreshToken) => {
	const tokenData = await prisma.user.findFirst({ where: { id: userID } });
	if (tokenData) {
		await prisma.user.update({
			where: { id: userID },
			data: {
				refreshToken,
			},
		});
		return;
	}
};

const removeToken = async (refreshToken) => {
	try {
		const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		if (token) {
			const user = await prisma.user.update({
				where: { email: token.payload },
				data: { refreshToken: null },
			});

			return;
		}
	} catch (e) {
		console.log(e);
	}
};

const verifyAccessToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		return userData;
	} catch (e) {
		return null;
	}
};

const verifyRefreshToken = (token) => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		return userData;
	} catch (e) {
		return null;
	}
};

const findToken = async (refreshToken) => {
	try {
		const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

		const db = await prisma.user.findFirst({
			where: { email: token.payload },
		});
		return db;
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	generateTokens,
	saveToken,
	removeToken,
	verifyAccessToken,
	verifyRefreshToken,
	findToken,
};
