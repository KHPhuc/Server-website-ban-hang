import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "./config/config";

import router from "./routes";

const app = express();
app.use(express.static("./src/public"));
app.use(cookieParser());
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

app.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}`);
});
