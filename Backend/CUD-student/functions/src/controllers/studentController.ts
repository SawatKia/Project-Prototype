/* eslint-disable max-len */
// ============== Dependencies Setup ==============
import {Request, Response, Router} from "express";

// =================== configuration ===================
import StudentModel from "../models/studentModel";
import {Student} from "../interfaces/Student";
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
  let statusMessage = `Student name "${req.params.name}" has been successfully retrieved`;
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

router.patch("/update/id/:id", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Updated";
  let statusMessage = `Student id ${req.params.id} has been updated successfully, this is the student after updated`;
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

router.put("/update/id/:id", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Updated";
  let statusMessage = `Student id ${req.params.name} has been updated successfully`;
  const validateStudentType = (object: any): object is Student => (
    typeof object === "object" &&
    object !== null &&
    "id" in object &&
    "name" in object &&
    "mobile" in object &&
    "address" in object &&
    Object.keys(object).length === 4 // Ensure there are no extra fields
  );

  try {
    // Check if req.body is of type Student
    if (!validateStudentType(req.body)) {
      throw new Error("Invalid student data. Ensure all required fields are provided.");
    }

    const updatedStudent = await StudentModel.updateStudent(req.params.id, req.body);
    return res.status(statusCode).send({
      status: statusLabel,
      message: {
        message: statusMessage,
        data: updatedStudent,
      },
    });
  } catch (error: unknown) {
    // Handle errors
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while updating student.";

    if (error instanceof Error) {
      if (error.message === "No student found") {
        statusCode = 404;
        statusLabel = "Not Found";
        statusMessage = error.message + ` with id ${req.params.id}`;
      } else if (error.message === "Invalid student data. Ensure all required fields are provided.") {
        statusCode = 400;
        statusMessage = error.message;
      }
    }

    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.delete("/delete/id/:id", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Updated";
  let statusMessage = `Student id ${req.params.name} has been updated successfully`;
  try {
    const isdeleted = await StudentModel.deleteStudent(req.params.id);
    if (isdeleted) {
      statusLabel = "Deleted";
    }
    statusMessage = `Student ${req.params.id} has been deleted successfully`;
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while deleting student.";
    if (error instanceof Error) {
      if (error.message == "No student found") {
        statusCode = 404;
        statusLabel = "Not Found";
        statusMessage = error.message + ` with id ${req.params.id}`;
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});

router.delete("/delete/all", async (req: Request, res: Response) => {
  let statusCode = 200;
  let statusLabel = "Deleted";
  let statusMessage = "All students have been deleted successfully";
  try {
    // Check for the custom header in the request
    const deleteAllHeader = req.headers["x-delete-all-students"];
    if (!deleteAllHeader || deleteAllHeader !== "true") {
      statusCode = 403; // Forbidden
      statusLabel = "Forbidden";
      statusMessage = "Deleting all students is not allowed without proper authorization.";
    } else {
      // Proceed with deletion
      const isDeleted = await StudentModel.deleteAllStudents();

      if (!isDeleted) {
        statusCode = 404;
        statusLabel = "Not Found";
        statusMessage = "No students found to delete.";
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  } catch (error: unknown) {
    statusCode = 500;
    statusLabel = "Error";
    statusMessage = "An unexpected error occurred while deleting students.";
    if (error instanceof Error) {
      statusMessage = error.message;
      if (error.message === "No student found") {
        statusCode = 404;
        statusLabel = "Not Found";
      }
    }
    return res.status(statusCode).send({
      status: statusLabel,
      message: statusMessage,
    });
  }
});


// Handle 405 Method Not Allowed for routes other than GET
const handleMethodNotAllowed = (req: Request, res: Response) => {
  return res.status(405).send({
    status: "Method Not Allowed",
    meassage: "The specified HTTP method is not allowed for this resource.",
  });
};
router.use((req: Request, res: Response) => {
  handleMethodNotAllowed(req, res);
});
export default router;
