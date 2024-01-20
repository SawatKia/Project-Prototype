/* eslint-disable max-len */
// ============================ configuration =====================================
import config from "../config/config";
interface Student {
  id: number;
  name: string;
  mobile: number;
  address: string;
}
/**
 * Represents a model for managing student data.
 */
class StudentModel {
  /**
   * The Firestore database instance.
   * @type {FirebaseFirestore.Firestore}
   * @private
   */
  private db = config.db;

  /**
 * Create a new student in the database.
 *
 * @async
 * @param {Student} student - The student object to be created.
 * @return {Promise<Student>} A promise that resolves to the created student.
 * @throws {Error} Throws an error if there's an issue creating the student.
 */
  async createStudent(student: Student): Promise<Student> {
    const date = Date.now();
    const data = {
      id: date,
      name: student.name,
      mobile: student.mobile,
      address: student.address,
    };

    try {
    // Use set with merge option to avoid overwriting existing data
      await this.db.collection("students").doc(`${date}`).set(data, {merge: true});

      // Return the created data after the database write is complete
      return data;
    } catch (error: any) {
    /**
     * An error occurred while creating the student.
     *
     * @typedef {object} CreateStudentError
     * @property {string} status - The error status.
     * @property {string} msg - The error message.
     */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while creating the student.",
      }));
    }
  }

  /**
   * Retrieves all students from the database.
   *
   * @async
   * @return {Promise<Student[]>} A promise that resolves to an array of students.
   * @throws {Error} Throws an error if there's an issue fetching the data.
   */
  async getAllStudents(): Promise<Student[]> {
    const table = this.db.collection("students");
    const allStudents: Student[] = [];

    try {
      const entry = await table.get();
      const student = entry.docs;

      student.forEach((S) => {
        allStudents.push({
          id: S.data().id,
          name: S.data().name,
          mobile: S.data().mobile,
          address: S.data().address,
        });
      });

      return allStudents;
    } catch (error: any) {
      /**
       * An error occurred while fetching all students.
       *
       * @typedef {object} FetchAllStudentsError
       * @property {string} status - The error status.
       * @property {string} msg - The error message.
       */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while fetching all students.",
      }));
    }
  }

  /**
 * Get a student by their ID from the database.
 *
 * @async
 * @param {string} id - The ID of the student to retrieve.
 * @return {Promise<Student | null>} A promise that resolves to the retrieved student or null if not found.
 * @throws {Error} Throws an error if there's an issue fetching the data or if no matching ID is found.
 */
  async getStudentById(id: string): Promise<Student | null> {
    try {
      const reqDoc = this.db.collection("students").doc(id);
      const userDetail = await reqDoc.get();

      if (!userDetail.exists) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: `No student found with ID: ${id}`,
        }));
      }

      const response = userDetail.data();
      if (!response) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: "Response data is undefined.",
        }));
      }

      return {
        id: response.id,
        name: response.name,
        mobile: response.mobile,
        address: response.address,
      };
    } catch (error: any) {
    /**
     * An error occurred while fetching the student by ID.
     *
     * @typedef {object} GetStudentByIdError
     * @property {string} status - The error status.
     * @property {string} msg - The error message.
     */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while fetching the student by ID.",
      }));
    }
  }

  /**
 * Get a student by their name from the database.
 *
 * @async
 * @param {string} name - The name of the student to retrieve.
 * @return {Promise<Student | null>} A promise that resolves to the retrieved student or null if not found.
 * @throws {Error} Throws an error if there's an issue fetching the data or if no matching student is found.
 */
  async getStudentByName(name: string): Promise<Student | null> {
    const table = this.db.collection("students");

    try {
    // Use where clause to filter by name
      const querySnapshot = await table.where("name", "==", name).get();

      if (querySnapshot.empty) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: `No student found with the name: ${name}`,
        }));
      }

      // Assume there's only one student with the given name
      const studentData = querySnapshot.docs[0].data();

      if (!studentData) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: "Student data is undefined.",
        }));
      }

      return {
        id: studentData.id,
        name: studentData.name,
        mobile: studentData.mobile,
        address: studentData.address,
      };
    } catch (error: any) {
    /**
     * An error occurred while fetching the student by name.
     *
     * @typedef {object} GetStudentByNameError
     * @property {string} status - The error status.
     * @property {string} msg - The error message.
     */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while fetching the student by name.",
      }));
    }
  }


  /**
 * Update a student in the database.
 *
 * @async
 * @param {string} id - The ID of the student to update.
 * @param {Student} student - The updated student information.
 * @return {Promise<Student>} A promise that resolves to the updated student.
 * @throws {Error} Throws an error if there's an issue updating the student, if no matching ID is found, or if the document is not updated.
 */
  async updateStudent(id: string, student: Student): Promise<Student> {
    try {
    // Check if the document exists before attempting to update
      const existingDoc = await this.db.collection("students").doc(id).get();

      if (!existingDoc.exists) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: `No student found with ID: ${id}`,
        }));
      }

      const reqDoc = this.db.collection("students").doc(id);
      const updateResult = await reqDoc.update({
        name: student.name,
        mobile: student.mobile,
        address: student.address,
      });

      // Check if the document was updated successfully
      if (updateResult.writeTime === null) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: `Failed to update student with ID: ${id}`,
        }));
      }

      return {
        id: parseInt(id),
        name: student.name,
        mobile: student.mobile,
        address: student.address,
      };
    } catch (error: any) {
    /**
     * An error occurred while updating the student.
     *
     * @typedef {object} UpdateStudentError
     * @property {string} status - The error status.
     * @property {string} msg - The error message.
     */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while updating the student.",
      }));
    }
  }


  /**
 * Delete a student from the database.
 *
 * @async
 * @param {string} id - The ID of the student to delete.
 * @return {Promise<boolean>} A promise that resolves to true if the student is successfully deleted, otherwise false.
 * @throws {Error} Throws an error if there's an issue deleting the student or if no matching ID is found.
 */
  async deleteStudent(id: string): Promise<boolean> {
    try {
    // Check if the document exists before attempting to delete
      const existingDoc = await this.db.collection("students").doc(id).get();

      if (!existingDoc.exists) {
        throw new Error(JSON.stringify({
          status: "Failed",
          msg: `No student found with ID: ${id}`,
        }));
      }

      const reqDoc = this.db.collection("students").doc(id);
      await reqDoc.delete();

      // Return true if the deletion was successful
      return true;
    } catch (error: any) {
    /**
     * An error occurred while deleting the student.
     *
     * @typedef {object} DeleteStudentError
     * @property {string} status - The error status.
     * @property {string} msg - The error message.
     */
      throw new Error(JSON.stringify({
        status: "Failed",
        msg: (error && error.message) ? error.message : "An error occurred while deleting the student.",
      }));
    }
  }
}

export default new StudentModel();
