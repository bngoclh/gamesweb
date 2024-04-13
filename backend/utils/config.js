require("dotenv").config();

// Put any environment variables in here to expose them.
const PORT = process.env.PORT || 3000;
const EXAMPLE_VARIABLE = process.env.EXAMPLE_VARIABLE;

module.exports = {
  PORT,
  EXAMPLE_VARIABLE,
};
