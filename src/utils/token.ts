import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { Request, Response } from "express";

const generateToken = (customerId: any, username: any) => {
  return jwt.sign(
    {
      customerId: customerId,
      username: username,
    },
    `${config.jwt_secret}`,
    {
      expiresIn: "3d",
    }
  );
};

const generateTokenAdmin = (customerId: any, username: any) => {
  return jwt.sign(
    {
      customerId: customerId,
      username: username,
      isAdmin: true,
    },
    `${config.jwt_secret_admin}`,
    {
      expiresIn: "3d",
    }
  );
};

const authTokenUser = (req: Request, res: Response, next: any) => {
  let token: any = req.cookies.token;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, `${config.jwt_secret}`, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    } else {
      return next();
    }
  });
};

const authTokenAdmin = (req: Request, res: Response, next: any) => {
  let token: any = req.cookies.token;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, `${config.jwt_secret_admin}`, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    } else {
      return next();
    }
  });
};

export {
  generateToken,
  authTokenUser,
  generateTokenAdmin,
  authTokenAdmin,
};
