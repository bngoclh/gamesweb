const express = require("express");
const controller = require("../controllers/comments.controller");
const router = express.Router();

router.route("/")
.get(controller.getComments)
.post(controller.postComment)




router.route("/:commentId")
.get(controller.getListComment)
.put(controller.putComment)
.delete(controller.deleteComment);

router.route("/scrape")
.post(controller.scrapeComment)
.put(controller.putComment)

router.route("/addMetaComments")
.post(controller.addMetacriticComment)

router.route("/verify/:gameId")
.get(controller.verifyComment)

module.exports = router;