const ApikeyService = require("../services/apikey.service");

const authenticate = async (req: any, res: Response, next: Function) => {
  
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  try {
    let account = await ApikeyService.getByField({ apikey: apiKey });

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
