const jwt = require("jsonwebtoken");
const secret = "dfsS180<ds-437hu-FDNfd";
const expiration = "2h";

const signToken = (payload) => {
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const isLoggedIn = (req, res, next) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { signToken, isLoggedIn };
