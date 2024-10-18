const express = require("express");
const router = express.Router();
const upload = require('../middlewares/uploader');
const dashboardController = require("../controller/dashboardController");

router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", dashboardController.createUser);

module.exports = router;
