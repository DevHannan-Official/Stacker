import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());
app.use(helmet);

app.get("/", (req, res) => {
  res.send("Hello From Stacker Server");
});

export default app;
