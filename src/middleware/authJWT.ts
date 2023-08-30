import express, { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
const blacklist: string[] = [];

/* module.exports = async (req: Request, res: Response, next: NextFunction) => {}; */

const authenticator = async (req: Request, res: Response, next: Function) => {
  try {
    //   get the token from the authorization header
    //const token = await req.headers.authorization.split(" ")[1];
    let token = extractToken(req);

    // Check if no token
    if (!token) {
      res
        .status(401)
        .json({ status: "error", message: "No token, authorization denied" });
    } else if (blacklist.includes(token)) {
        res
        .status(401)
        .json({ status: "error", message: "Token revoked" });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || "SECRET-TOKEN";
    try {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(401).json({
            status: "error",
            message: "Token is not valid",
          });
        } else {
          //console.log(decoded);
          req.user = decoded;
          next();
        }
      });
    } catch (err: any) {
      console.error("Invalid Token: " + token);
      console.error(err);
      res.status(500).json({ status: "error", message: "Invalid Token" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ status: "error", message: "Unauthorized Request" });
  }
};

const blacklistToken = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    //const token = await req.headers.authorization.split(" ")[1];
    let token = extractToken(req); 
    if (!token) {
      res
        .status(401)
        .json({ status: "error", message: "No token, authorization denied" });
    }

    if (blacklist.includes(token)) {        
        res
        .status(401)
        .json({ status: "error", message: "Token already revoked" });
    } else {
      blacklist.push(token);   
      next();
    }

  } catch (error: any) {
    res
      .status(500)
      .json({ status: "error", message: "Unauthorized Request" });
  }  
};

function extractToken(req: Request) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token
    }
    return null;
}

module.exports = {
  authenticator,
  blacklistToken
};

//https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/