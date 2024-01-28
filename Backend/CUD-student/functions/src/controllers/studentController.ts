/* eslint-disable max-len */
// ============== Dependencies Setup ==============
import {Request, Response, Router} from "express";

// =================== configuration ===================
import StudentModel from "../model/studentModel";
// eslint-disable-next-line new-cap
const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Success";
  let statusMessage = "Students created successfully";
  try {
    const newStudent = await StudentModel.createStudent(req.body);
    statusCode = 201;
    statusLabel = "Created";
    return res.status(statusCode).send({
      status: statusLabel,
      message: {
        message: statusMessage,
        data: newStudent,
      },
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while creating student";
    if (error instanceof Error) {
      statusMessage = error.message;
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.get("/get/all", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Success";
  let statusMessage = "Students retrieved successfully";
  try {
    const allStudents = await StudentModel.getAllStudents();

    return res.status(statusCode).send({
      status: statusLabel,
      message: {
        message: statusMessage,
        data: allStudents || null,
      },
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while retrieving students";

    if (error instanceof Error) {
      if (error.message == "No students found") {
        statusCode = 204;
        statusLabel = "No content";
        statusMessage = error.message;
      }
    }

    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.get("/get/id/:id", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Success";
  let statusMessage = `Student id ${req.params.id} has been successfully retrieved`;
  try {
    const student = await StudentModel.getStudentById(req.params.id);
    return res.status(statusCode).send({
      status: statusLabel,
      message: {
        message: statusMessage,
        data: student,
      },
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while retrieving student";
    if (error instanceof Error) {
      if (error.message == "No student Found") {
        statusCode = 204;
        statusLabel = "No Content";
        statusMessage = error.message + ` with id ${req.params.id}`;
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.get("/get/name/:name", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Success";
  let statusMessage = `Student id ${req.params.name} has been successfully retrieved`;
  try {
    const student = await StudentModel.getStudentByName(req.params.name);
    return res.status(statusCode).send({
      status: statusLabel,
      message: {
        message: statusMessage,
        data: student,
      },
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while retrieving the student";
    if (error instanceof Error) {
      if (error.message == "No student Found") {
        statusCode = 204;
        statusLabel = "No Content";
        statusMessage = error.message + ` with name ${req.params.name}`;
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.patch("/update/:id", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Updated";
  let statusMessage = `Student id ${req.params.name} has been updated successfully`;
  try {
    const updatedStudent = await StudentModel.updateStudent(req.params.id, req.body);
    return res.status(statusCode).send({
      status: statusLabel,
      messsage: {
        message: statusMessage,
        data: updatedStudent,
      },
    });
  } catch (error : unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while updating student.";
    if (error instanceof Error) {
      if (error.message == "No student found") {
        statusCode = 404;
        statusLabel = "not found";
        statusMessage = error.message + ` with id ${req.params.id}`;
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

// router.put("/update/:id", async (req: Request, res: Response) => {
// });

// router.delete("/delete/:id", async (req: Request, res: Response) => {
// });

// router.delete("/delete/all", async (req: Request, res: Response) => {
// });


// Handle 405 Method Not Allowed for routes other than GET
const handleMethodNotAllowed = (req: Request, res: Response) => {
  return res.status(405).send({
    status: "Method Not Allowed",
    msg: "The specified HTTP method is not allowed for this resource.",
  });
};
router.all("/create", handleMethodNotAllowed);
router.all("/get/:id", handleMethodNotAllowed);
router.all("/get/all", handleMethodNotAllowed);
router.all("/update/:id", handleMethodNotAllowed);
router.all("/delete/:id", handleMethodNotAllowed);
router.all("/delete/all", handleMethodNotAllowed);
export default router;
