const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboardController");
const upload = require('../middlewares/uploader');

router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
// router.post("/users/create", dashboardController.createUser);
router.post("/users/create", upload.single('photo'), dashboardController.createUser);

// view engine tidak ada pit atau patch

module.exports = router;
