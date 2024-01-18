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
  // create a new student
  // get student by Id
  // get student by name
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
}

export default new StudentModel();
