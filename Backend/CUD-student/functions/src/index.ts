// ============== Dependencies Setup ==============
import * as functions from "firebase-functions";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
// =================== configuration ===================
import studentController from "./controllers/studentController";
import stockController from "./controllers/stocksController";
const app = express();

app.use(cors({
  origin: true,
}));

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


