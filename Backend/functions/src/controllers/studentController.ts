// ============== Dependencies Setup ==============
import {Request, Response, Router} from "express";

// =================== configuration ===================
import StudentModel from "../model/studentModel";
// eslint-disable-next-line new-cap
const router = Router();

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const allStudents = await StudentModel.getAllStudents();

    if (allStudents.length === 0) {
      // Return 204 No Content if there are no students
      return res.status(204).send({
        status: "no-content",
        message: "No students found",
      });
    }

    return res.status(200).send({
      status: "Success",
      message: allStudents,
    });
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let errorMsg = "An unexpected error occurred.";

    if (error instanceof Error) {
      // Handle specific error types and set appropriate HTTP status codes
      if (error.message === "Some specific error condition") {
        statusCode = 400;
        errorMsg = error.message;
      }
    }

    return res.status(statusCode).send({
      status: "Error",
      msg: errorMsg,
    });
  }
});

// Handle 405 Method Not Allowed for routes other than GET
router.all("/getAll", (req: Request, res: Response) => {
  return res.status(405).send({
    status: "Method Not Allowed",
    msg: "The specified HTTP method is not allowed for this resource.",
  });
});

export default router;
