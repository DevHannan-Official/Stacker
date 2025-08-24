import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Stacker Server");
});

export default app;
