"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.static("./src/public"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// app.use(
//   session({
//     secret: "Hello",
//   })
// );
app.get("/", (req, res) => {
    res.send("Hello");
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
app.use("/api", routes_1.default);
// app.listen(process.env.PORT || config.port, () => {
//   console.log(`Running on http://localhost:${config.port}`);
// });
app.listen(5000, () => {
    console.log(`Running on http://localhost:5000`);
});
