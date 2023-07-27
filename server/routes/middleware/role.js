const jwt = require("jsonwebtoken");
const { prisma } = require("../../../prisma/prisma-client");
const { verifyRefreshToken } = require("../../service/tokenService");

/**
 *
 * @desc middleware for role checking, takes roles array
 */
const roleCheck = (roles) => {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const userData = verifyRefreshToken(token);

			if (!token || !userData) {
				return res.status(403).json({ message: "Не авторизован" });
			}

			const user = await prisma.user.findFirst({
				where: { email: userData.payload },
			});

			let hasRole = false;
			roles.forEach((role) => {
				if (role == user.role) {
					hasRole = true;
				}
			});

			if (!hasRole) {
				return res
					.status(403)
					.json({ message: "Вам отказано в доступе" });
			}

			next();
		} catch (e) {
			console.log(e);
			return res.status(403).json({ message: "Не авторизован" });
		}
	};
};

module.exports = { roleCheck };
