const jwt = require("jsonwebtoken");
const User=require("../UserSchema")
require('dotenv').config();
exports.isAuth = async (req, res, next) => {
  try {
    // Assuming the token is stored in the 'Authorization' header as a Bearer token
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.userId);

      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
      res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
