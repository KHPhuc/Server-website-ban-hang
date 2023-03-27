import { Request, Response } from "express";
import Customer from "../model/customer.model";
import { generateToken, generateTokenAdmin } from "../utils/token";
import { generateId } from "../utils/id";
import { json } from "body-parser";
import Address from "../model/address.model";

const prefix = "C";

const getAll = (req: Request, res: Response) => {
  Customer.getAll(req.params.page, (err: any, data: any) => {
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
      let token =
        req.body.isAdmin === "true"
          ? generateTokenAdmin(customer.customerId, req.body.phoneNumber)
          : generateToken(customer.customerId, req.body.phoneNumber);
      // res.setHeader('set-cookie', token)
      res.cookie("token", token, {
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        id: customer.customerId,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        name: req.body.name,
        isAdmin: req.body.isAdmin === "true" ? true : false,
        addressId: null,
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
          let token =
            data[0].isAdmin === "true"
              ? generateTokenAdmin(data.customerId, req.body.username)
              : generateToken(data.customerId, req.body.username);
          // console.log(token);
          res.cookie("token", token, {
            sameSite: "none",
            secure: true,
          });
          // console.log(res);
          res.status(200).json({
            id: data[0].customerId,
            phoneNumber: data[0].phoneNumber,
            email: data[0].email,
            name: data[0].name,
            isAdmin: data[0].isAdmin === "true" ? true : false,
            addressId: data[0],
            // token: token,
          });
        } else {
          res.status(400).send("Invalid Credentials");
        }
      }
    }
  );
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json();
};

export const getInfo = (req: Request, res: Response) => {
  Customer.getInfo(req.params.customerId, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json(data);
    }
  });
};

export const updateInfo = (req: Request, res: Response) => {
  if (req.body.name) {
    let newAddress = new (Address as any)(req.body);
    newAddress.addressId = generateId("A");
    Address.create(newAddress, (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        let customer = new (Customer as any)(req.body);
        customer.addressId = newAddress.addressId;
        Customer.updateInfo(
          req.params.customerId,
          customer,
          (err: any, data: any) => {
            if (err) {
              console.log(err);
              res.status(500).json();
            } else {
              Customer.getInfoAfterUpdate(
                req.params.customerId,
                (err: any, data: any) => {
                  if (err) {
                    console.log(err);
                    res.status(500).json();
                  } else {
                    res.status(200).json({
                      id: data[0].customerId,
                      phoneNumber: data[0].phoneNumber,
                      email: data[0].email,
                      name: data[0].name,
                      isAdmin: data[0].isAdmin === "true" ? true : false,
                      addressId: data[0].addressId,
                      // token: token,
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  } else {
    let customer = new (Customer as any)(req.body);

    Customer.updateInfo(
      req.params.customerId,
      customer,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          res.status(500).json();
        } else {
          res.status(200).json();
        }
      }
    );
  }
};

export const changePassword = (req: Request, res: Response) => {
  Customer.changePassword(
    req.body.newPassword,
    req.body.customerId,
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.status(500).json();
      } else {
        res.status(200).json();
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
