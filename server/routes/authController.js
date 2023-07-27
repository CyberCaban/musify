const { prisma } = require("../../prisma/prisma-client");
const bcrypt = require("bcrypt");

const {
	generateTokens,
	saveToken,
	removeToken,
	verifyRefreshToken,
	findToken,
} = require("../service/tokenService");

/**
 *
 * @route POST auth/register
 * @desc регистрация
 * @access Public
 */
const register = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		console.log(req.body);

		if (!email || !password || !name) {
			return res
				.status(400)
				.json({ message: "Пожалуйста, заполните обязятельные поля" });
		}

		const RegisteredUser = await prisma.user.findFirst({
			where: { email },
		});

		if (RegisteredUser) {
			return res.status(400).json({
				message: "Пользователь, с таким email уже существует",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const token = generateTokens(email);

		const user = await prisma.user.create({
			data: {
				role: "user",
				email,
				password: hashedPassword,
				name,
			},
		});

		if (user) {
			saveToken(user.id, token.refreshToken);
			res.cookie("refreshToken", token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60,
				httpOnly: true,
			});
			res.status(200).json({
				id: user.id,
				email: user.email,
				name: user.name,
				password: user.password,
				role: user.role,
				tracks: user.tracks,
				token: token.refreshToken,
			});
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Register error" });
	}
};

/**
 *
 * @route POST auth/login
 * @desc логин
 * @access Public
 */
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Пожалуйста, заполните обязятельные поля" });
		}

		const user = await prisma.user.findFirst({ where: { email } });
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (user && isPasswordCorrect) {
			const token = generateTokens(email);
			await prisma.user.update({
				where: { email },
				data: { refreshToken: token.refreshToken },
			});
			res.cookie("refreshToken", token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60,
				httpOnly: true,
			});
			res.status(200).json({
				id: user.id,
				email: user.email,
				name: user.name,
				password: user.password,
				role: user.role,
				tracks: user.tracks,
				refreshToken: token.refreshToken,
				accessToken: token.accessToken,
			});
		} else {
			res.status(400).json({ message: "Неверный логин или пароль" });
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Login error" });
	}
};

/**
 *
 * @route POST auth/logout
 * @desc логаут
 * @access Public
 */
const logout = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		removeToken(refreshToken);
		res.clearCookie("refreshToken");
		res.status(200).json({});
	} catch (e) {
		console.log(e);
	}
};

/**
 *
 * @route POST auth/logout
 * @desc проверка токена и его перезапись в БД
 * @access Public
 */
const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		const email = verifyRefreshToken(refreshToken).payload;
		const tokenFromDB = await findToken(refreshToken);

		if (!refreshToken || !email || !tokenFromDB) {
			return res
				.json(401)
				.json({ message: "Пользователь не авторизован" });
		}

		const token = generateTokens(email);
		console.log(email);
		const user = await prisma.user.update({
			where: { email },
			data: { refreshToken: token.refreshToken },
		});
		res.cookie("refreshToken", token.refreshToken, {
			maxAge: 30 * 24 * 60 * 60,
			httpOnly: true,
		});
		return res.json({ token, user });
	} catch (e) {
		console.log(e);
		next();
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({});
		return res.json(users);
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "getUser error" });
	}
};

const test = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		console.log(verifyRefreshToken(refreshToken));
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	register,
	login,
	getAllUsers,
	logout,
	refresh,
	test,
};
