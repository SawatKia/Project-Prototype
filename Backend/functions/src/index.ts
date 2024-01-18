// ============== Dependencies Setup ==============
import * as functions from "firebase-functions";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
// =================== configuration ===================
import StudentModel from "./model/studentModel";
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

app.get("/getAll", async (req, res) => {
  try {
    const allStudents = await StudentModel.getAllStudents();

    return res.status(200).send({
      status: "Success",
      message: allStudents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "Failed",
      msg: error,
    });
  }
});

// app.get("/getAll", (req, res) => {
//   (async () => {
//     try {
//       const table = db.collection("students");
//       const allStudents: Student[] = [];
//       await table.get().then((entry) => {
//         const student = entry.docs;
//         student.map((S) => {
//           allStudents.push({
//             id: S.data().id,
//             name: S.data().name,
//             mobile: S.data().mobile,
//             address: S.data().address,
//           });
//           return allStudents;
//         });
//       });
//       return res.status(200).send({
//         status: "Success",
//         message: allStudents,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({
//         status: "Failed",
//         msg: error,
//       });
//     }
//   })();
// });


exports.crudApi = functions.https.onRequest(app);


