import uniqid from "uniqid";

export const generateId = (header: any) => {
  return uniqid(`${header}-`);
};

// A - address
// C - customer
// DP - detail product
// 0 - order
// PM - payment method
// P - product
// PT - product type
// S - shipping
