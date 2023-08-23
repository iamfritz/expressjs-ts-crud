const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];
    //const token2 = request.body.token || request.query.token || request.headers["x-access-token"];

    // Check if no token
    if (!token) {
      response
        .status(401)
        .json({ status: "error", message: "No token, authorization denied" });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET-TOKEN";
    try {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          response.status(401).json({
            status: "error",
            message: "Token is not valid",
          });
        } else {
          //console.log(decoded);
          request.user = decoded;
          next();
        }
      });
    } catch (err) {
      console.error("Invalid Token: " + token);
      console.error(err);
      response.status(500).json({ status: "error", message: "Invalid Token" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ status: "error", message: "Unauthorized Request" });
  }
};


//https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/