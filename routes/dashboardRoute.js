const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboardController");

router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", dashboardController.createUser);

// view engine tidak ada pit atau patch

module.exports = router;
