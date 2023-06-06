const jwt = require("jsonwebtoken");
const secret = "dfsS180<ds-437hu-FDNfd";
const expiration = "2h";

const signToken = (payload) => {
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
