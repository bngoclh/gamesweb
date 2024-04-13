var express = require("express");
const controller = require("../controllers/games.controller");
const router = express.Router();


router.get("/").get(controller.getGamesFirstPage);

module.exports = router;
