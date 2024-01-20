// ============== Dependencies Setup ==============
import * as functions from "firebase-functions";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
// =================== configuration ===================
import studentController from "./controllers/studentController";
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

app.use("/student", studentController);

exports.crudApi = functions.https.onRequest(app);


