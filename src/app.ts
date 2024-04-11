import express from "express";

const app = express();

// http method

app.get("/", (req, res) => {
  res.status(200).json({
    message: "mastering REST API",
  });
});

export default app;