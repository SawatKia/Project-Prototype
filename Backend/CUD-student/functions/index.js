/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const studentApi = express();
studentApi.use(cors({
  origin: true,
}));

studentApi.get("/", (req, res) => {
  return res.status(200).send({
    statusCode: "success",
    message: "You are now connedted to the Firebase",
  });
});
