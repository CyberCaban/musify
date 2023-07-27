const express = require("express");
const router = express.Router();
const {
	register,
	login,
	getAllUsers,
	logout,
	test,
	refresh,
} = require("./authController");
const { roleCheck } = require("./middleware/role");
const { auth } = require("./middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/test", test);
router.get("/refresh", refresh);
router.get("/users", auth, getAllUsers);

module.exports = router;
