import { config } from "../../config/config";

export const makeMomo = (soTien: any, maDonHang: any) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();

  // var redirectUrl = "https://momo.vn/return";
  // var redirectUrl = "http://localhost:5173/pay-handle";
  var redirectUrl = `${config.front}/pay-handle`;
  var ipnUrl = `${config.back}/order/receive_result`;
  // var ipnUrl = "https://server-ban-hang.herokuapp.com/api/order/receive_result";
  // https://server-ban-hang.herokuapp.com/api
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  var orderId = maDonHang; // Mã đơn hàng
  var amount = soTien; // Số tiền
  var orderInfo = "Đơn hàng Hoàng Minh Shop"; // Nội dung
  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: any) => {
      // console.log(`Status: ${res.statusCode}`);
      // console.log(`Headers: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      res.on("data", (body: any) => {
        // console.log("Body: ");
        // console.log(body);
        // console.log("payUrl: ");
        var url = JSON.parse(body).payUrl;
        // console.log(JSON.parse(body).payUrl);
        resolve(url);
      });
      res.on("end", () => {
        // console.log("No more data in response.");
      });
    });

    req.on("error", (e: any) => {
      console.log(`problem with request: ${e.message}`);
      reject(e);
    });
    // write data to request body
    // console.log("Sending....");
    req.write(requestBody);
    req.end();
  });
};

export const makeRefundMomo = (
  soTien: any,
  maDonHang: any,
  maGiaoDich: any
) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();

  // var redirectUrl = `${config.front}/pay-handle`;
  // var ipnUrl = `${config.back}/order/receive_result`;
  // var requestType = "captureWallet";
  // var extraData = ""; 
  //pass empty value if your merchant does not have stores

  var orderId = maDonHang; // Mã đơn hàng
  var amount = soTien; // Số tiền
  var orderInfo = "Đơn hàng Hoàng Minh Shop"; // Nội dung

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&description=" +
    "" +
    "&orderId=" +
    orderId +
    "&partnerCode=" +
    partnerCode +
    "&requestId=" +
    requestId +
    "&transId=" +
    parseInt(maGiaoDich);
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    // accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    transId: parseInt(maGiaoDich),
    // orderType: "refund",
    description: "",
    // redirectUrl: redirectUrl,
    // ipnUrl: ipnUrl,
    // extraData: extraData,
    // requestType: requestType,
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/refund",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: any) => {
      // console.log(`Status: ${res.statusCode}`);
      // console.log(`Headers: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      res.on("data", (body: any) => {
        // console.log("Body: ");
        // console.log(body);
        // console.log("payUrl: ");
        // var url = JSON.parse(body).payUrl;
        // console.log(JSON.parse(body).payUrl);
        resolve(JSON.parse(body));
      });
      res.on("end", () => {
        // console.log("No more data in response.");
      });
    });

    req.on("error", (e: any) => {
      console.log(`problem with request: ${e.message}`);
      reject(e);
    });
    // write data to request body
    // console.log("Sending....");
    req.write(requestBody);
    req.end();
  });
};
