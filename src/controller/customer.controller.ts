import { Request, Response } from "express";
import Customer from "../model/customer.model";
import { generateToken } from "../utils/token";
import { generateId } from "../utils/id";
import { json } from "body-parser";

const prefix = "C";

const getAll = (req: any, res: any) => {
  Customer.getAll((err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

const create = (req: any, res: any) => {
  const newCustomer = new (Customer as any)(req.body);
  newCustomer.customerId = generateId(prefix);
  Customer.register(newCustomer, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAll(req, res);
    }
  });
};

const register = (req: Request, res: Response) => {
  const customer = new (Customer as any)(req.body);
  customer.customerId = generateId(prefix);
  Customer.register(customer, (err: any, data: any) => {
    if (err) {
      // console.log(err.code, err.sqlMessage);
      if (err.code === "ER_DUP_ENTRY") {
        if (err.sqlMessage.includes("phoneNumber")) {
          res.status(500).json({ message: "Số điện thoại đã được sử dụng!" });
        } else if (err.sqlMessage.includes("email")) {
          res.status(500).json({ message: "Email đã được sử dụng!" });
        }
      }
    } else {
      let token = generateToken(customer.customerId, req.body.phoneNumber);
      // res.setHeader('set-cookie', token)
      res.cookie("token", token, {
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        id: customer.customerId,
        username: req.body.phoneNumber,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        name: req.body.name,
        isAdmin: req.body.isAdmin ? true : false,
        // token: token,
      });
    }
  });
};

const login = (req: Request, res: Response) => {
  Customer.login(
    req.body.username,
    req.body.password,
    (err: any, data: any) => {
      if (err) {
        res.json(err);
      } else {
        if (data.length) {
          let token = generateToken(data.customerId, req.body.username);
          // console.log(token);
          res.cookie("token", token, {
            sameSite: "none",
            secure: true,
          });
          // console.log(res);
          res.status(200).json({
            id: data[0].customerId,
            username: req.body.username,
            phoneNumber: data[0].phoneNumber,
            email: data[0].email,
            name: data[0].name,
            isAdmin: data[0].isAdmin === "true" ? true : false,
            // token: token,
          });
        } else {
          res.status(400).send("Invalid Credentials");
        }
      }
    }
  );
};

const ban = (req: Request, res: Response) => {
  Customer.ban(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAll(req, res);
    }
  });
};

const unBan = (req: Request, res: Response) => {
  Customer.unBan(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      getAll(req, res);
    }
  });
};

export { getAll, login, register, create, ban, unBan };
