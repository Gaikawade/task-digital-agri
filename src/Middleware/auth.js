const jwt = require('jsonwebtoken');
const { sendError } = require('../Utils/helper');

exports.auth = async (req, res, next) => {
  let token = req.headers[`authorization`];
  if(!token){
    sendError(res, "Token is missing from request");
  }

  jwt.verify(token, process.env.KEY, (err, decodedToken) => {
    if(err){
      const msg = err.message === "jwt expired" ? "Token isexpired" : "Token is invalid";
      sendError(res, msg);
    }
    req.adminId = decodedToken.adminId;
    next();
  })
};