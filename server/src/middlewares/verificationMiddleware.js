const jwt = require("jsonwebtoken");

module.exports.verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "USER" || decoded.role === "ADMIN") {
      req.user = decoded;
      return next();
    } else {
      return res.status(400).send({
        success: false,
        message: "Please login first!",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token");

      return res.status(401).send({
        success: false,
        message: "Session expired. Please login again.",
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "Invalid token",
      });
    }
  }
};
module.exports.verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "USER") {
      return res.status(403).send({
        success: false,
        message: "Access denied: Admin access required",
      });
    } else {
      req.user = decoded;
      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token");
      res.clearCookie("userProfile");

      return res.status(401).send({
        success: false,
        message: "Session expired. Please login again.",
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "Invalid token",
      });
    }
  }
};
