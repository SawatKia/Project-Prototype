/* eslint-disable max-len */
// ============== Dependencies Setup ==============
import * as functions from "firebase-functions";

import * as moment from "moment-timezone";
import * as express from "express";
import {Request, Response, NextFunction} from "express";
import * as cors from "cors";
// =================== configuration ===================
import studentController from "./controllers/studentController";
import stockController from "./controllers/stocksController";
import loggerModel from "./models/loggerModel";
import {Log} from "./interfaces/logger";
const app = express();

const logger = (req: Request, res: Response, next: NextFunction) => {
  // const timestamp = new Date().toLocaleString();
  const bangkokTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  const logMessage: Log= {
    timestamp: bangkokTime,
    method: req.method,
    path: req.url,
    Responsestatus: res.statusCode,
  };
  loggerModel.insertLog(logMessage);
  console.log(JSON.stringify(logMessage));
  next();
};

app.use(cors({
  origin: true,
}));
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    status: "Success",
    message: "You are now connected to the CRUD api",
  });
});
app.all("/", (req: Request, res: Response) => {
  return res.status(200).send({
    status: "Method Not Allowed",
    msg: "The specified HTTP method is not allowed for this resource.",
  });
});

app.use("/student", studentController);
app.use("/stock", stockController);

exports.crudApi = functions.https.onRequest(app);


