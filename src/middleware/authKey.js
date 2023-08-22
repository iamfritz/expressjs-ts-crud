const ApikeyService = require("../services/apikey.service");

const authenticate = async (req, res, next) => {
  //Add API key to headers
  let userKey = req.header("api-key");
  console.log(userKey);
  if (!userKey) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    let account = await ApikeyService.findOne({ api_key: userKey });

    if (account) {
      next();
    } else {
      //Reject request if API key doesn't match
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error");
    console.error(error.message);
  }
};
module.exports = authenticate;
