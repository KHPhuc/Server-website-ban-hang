import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import * as path from "path";

import router from "./routes";

const app = express();
app.use(express.static(path.join(__dirname, "../src/public")));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// app.use(
//   session({
//     secret: "Hello",
//   })
// );

app.get("/", (req, res) => {
  let p = path.join(__dirname, "../src/public");
  res.send("Hello: " + p);
});

// app.get("/sse", (req, res) => {
//   console.log("Connected");
//   // res.setHeader("Content-Type", "text/event-stream");
//   res.writeHead(200, {
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//   });

//   const intervalId = setInterval(() => {
//     const date = new Date().toLocaleString();
//     console.log(date);
//     res.write(`data: ${date}\n\n`);
//   }, 1000);

//   res.on("close", () => {
//     console.log("Closed");
//     clearInterval(intervalId);
//     res.end();
//   });
// });

app.use("/api", router);

// app.listen(process.env.PORT || config.port, () => {
//   console.log(`Running on http://localhost:${config.port}`);
// });
app.listen(5000, () => {
  console.log(`Running on http://localhost:5000`);
});
