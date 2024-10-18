const express = require("express");
const router = express.Router();
const upload = require('../middlewares/uploader');
const userController = require("../controller/userController");

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById);
router.patch("/:id", userController.UpdateUserById);
router.post("/", upload.single('photo'), userController.createUser);

module.exports = router;
