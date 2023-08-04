const sauceCtrl = require("../controller/sauce_controller");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer")


router.post("/",auth, multer, sauceCtrl.createSauce)
router.get("/:id",auth, sauceCtrl.getOneSauce)
router.get("/",auth, sauceCtrl.getAllSauce)
router.put("/:id",auth, multer, sauceCtrl.modifySauce)
router.delete("/:id",auth, sauceCtrl.deleteSauce)
router.post("/:id/like",auth, sauceCtrl.likeSauce)




module.exports = router;