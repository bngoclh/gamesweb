const exampleRouter = require("express").Router();

exampleRouter.get("/", (request, response) => {
  response.json({ message: "Hello from the backend!" });
});

module.exports = exampleRouter;
