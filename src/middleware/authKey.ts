const ApikeyService = require("../services/apikey.service");

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  
  let userKey = req.header("api-key");
  
  if (!userKey) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    let account = await ApikeyService.getByField({ api_key: userKey });

    if (account) {
      next();
    } else {
      //Reject request if API key doesn't match
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
    console.error(error.message);
  }
};
module.exports = authenticate;
