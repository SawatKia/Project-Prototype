/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
// ============================ configuration =====================================
import config from "../config/config";
import {Student} from "../interfaces/Student";
// interface Student {
//   id: number;
//   name: string;
//   mobile: number;
//   address: string;
// }
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
    const lowerCaseName = student.name.toLowerCase();
    const data = {
      id: date,
      // date created in bangkok time for real project
      name: lowerCaseName,
      mobile: student.mobile,
      address: student.address,
    };
    try {
      // Use set with merge option to avoid overwriting existing data
      await this.db.collection("students").doc(`${date}`).set(data, {merge: true});
      // if data input type != Student type then error
      // Return the created data after the database write is complete
      return data;
    } catch (error: any) {
      throw new Error("Failed to create the student.");
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
      if (allStudents.length === 0) {
        throw new Error("No students found");
      }
      return allStudents;
    } catch (error: any) {
      throw new Error(error.message || "Failed to get all student.");
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
        throw new Error("No student found");
      }
      const response = userDetail.data();
      if (!response) {
        throw new Error("Student Document was get but no data was found");
      }
      return {
        id: response.id,
        name: response.name,
        mobile: response.mobile,
        address: response.address,
      };
    } catch (error: any) {
      throw new Error(error.message);
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
  async getStudentByName(name: string): Promise<Student[]> {
    const lowerCaseName = name.toLowerCase();
    const table = this.db.collection("students");
    const matchingStudents: Student[] = [];
    try {
      // Use where clause to filter by case-insensitive partial name match
      const querySnapshot = await table
        .where("name", ">=", lowerCaseName)
        .where("name", "<=", lowerCaseName + "\uf8ff")
        .get();
      if (querySnapshot.empty) {
        // Return an empty array if no students are found
        return matchingStudents;
      }
      // Loop through all documents in the querySnapshot
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        if (studentData) {
          matchingStudents.push({
            id: studentData.id,
            name: studentData.name,
            mobile: studentData.mobile,
            address: studentData.address,
          });
        }
      });
      return matchingStudents;
    } catch (error: any) {
      throw new Error(error.message || "Failed to get students");
    }
  }

  /**
 * Update a student in the database.
 *
 * @async
 * @param {string} id - The ID of the student to update.
 * @param {Partial<Student>} studentUpdate - The updated student information.
 * @return {Promise<Student>} A promise that resolves to the updated student.
 * @throws {Error} Throws an error if there's an issue updating the student, if no matching ID is found, or if the document is not updated.
 */
  async updateStudent(id: string, studentUpdate: Partial<Student>): Promise<Student> {
    // Fetch existing student data from the database
    const studentRef = this.db.collection("students").doc(id);
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists) {
      throw new Error("No student found");
    }
    const studentData = studentDoc.data() as Student;
    // merrge updates to the existing data
    const dataToUpdate = {...studentData, ...studentUpdate};

    // Update the student in the database
    await this.db.collection("students").doc(id).update(dataToUpdate);
    const updatedStudent = await this.getStudentById(id) as Student;
    // Return the updated student data
    return updatedStudent;
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
        throw new Error("No student found");
      }
      const reqDoc = this.db.collection("students").doc(id);
      await reqDoc.delete();
      // Return true if the deletion was successful
      return true;
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete the student.");
    }
  }

  /**
 * Delete all students from the database.
 *
 * @async
 * @return {Promise<boolean>} A promise that resolves to true if all students are successfully deleted, otherwise false.
 * @throws {Error} Throws an error if there's an issue deleting the students.
 */
  async deleteAllStudents(): Promise<boolean> {
    try {
    // Fetch all student documents
      const allStudentsSnapshot = await this.db.collection("students").get();
      // Check if there are any students to delete
      if (allStudentsSnapshot.empty) {
      // Return false if there are no students to delete
        return false;
      }
      // Delete each student document
      const deletePromises = allStudentsSnapshot.docs.map(async (doc) => {
        await doc.ref.delete();
      });
      // Wait for all delete operations to complete
      await Promise.all(deletePromises);
      // Return true to indicate successful deletion of all students
      return true;
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete all students.");
    }
  }
}

export default new StudentModel();

