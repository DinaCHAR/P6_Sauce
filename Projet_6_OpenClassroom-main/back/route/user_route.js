const userCtrl = require("../controller/user_controller");
const express = require("express");
const router = express.Router();


router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)


module.exports = router;