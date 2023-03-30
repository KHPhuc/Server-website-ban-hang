import { Request, Response } from "express";
import Customer from "../model/customer.model";
import Order from "../model/Order/order.model";

export const getCard = (req: Request, res: Response) => {
  var promise1 = new Promise((resolve, reject) => {
    Order.statistic1((err1: any, res1: any) => {
      if (err1) {
        console.log(err1);
        reject;
      } else {
        resolve(res1[0]);
      }
    });
  });

  var promise2 = new Promise((resolve, reject) => {
    Order.statistic2((err2: any, res2: any) => {
      if (err2) {
        console.log(err2);
        reject;
      } else {
        resolve(res2[0]);
      }
    });
  });

  var promise3 = new Promise((resolve, reject) => {
    Customer.statistic((err3: any, res3: any) => {
      if (err3) {
        console.log(err3);
        reject;
      } else {
        resolve(res3[0]);
      }
    });
  });
  var data = {};
  Promise.allSettled([promise1, promise2, promise3])
    .then((rs) => {
      rs.forEach((e: any) => (data = { ...data, ...e.value }));
      res.status(200).json(data);
    })
    .catch((er) => {
      console.log(er);
      res.status(500).json();
    });
};

export const getLine = (req: Request, res: Response) => {
  var promise1 = new Promise((resolve, resject) => {
    Order.statistic3((err1: any, res1: any) => {
      if (err1) {
        console.log(err1);
      } else {
        resolve(res1);
      }
    });
  });

  var promise2 = new Promise((resolve, reject) => {
    Order.statistic4((err1: any, res1: any) => {
      if (err1) {
        console.log(err1);
        reject;
      } else {
        resolve(res1);
      }
    });
  });

  var data: any = [];
  Promise.allSettled([promise1, promise2])
    .then((rs) => {
      rs.forEach((e: any) => e.value.forEach((e1: any) => data.push(e1)));
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json();
    });
};

export const getPie = (req: Request, res: Response) => {
  Order.statistic5((err1: any, res1: any) => {
    if (err1) {
      console.log(err1);
      res.status(500).json();
    } else {
      res.status(200).json(res1);
    }
  });
};

export const getTree = (req: Request, res: Response) => {
  Order.statistic6((err1: any, res1: any) => {
    if (err1) {
      console.log(err1);
      res.status(500).json();
    } else {
      res.status(200).json(res1);
    }
  });
};
