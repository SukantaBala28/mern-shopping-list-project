const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  //check for token
  if(!token) 
    return res.status(401).json({msg: "No token, Authorization denied."})

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token not valid." });
  }
}

module.exports = auth;