import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import Axios, { AxiosResponse } from "axios";
import { response } from "express";
interface Student {
    name: string;
    address: string;
    mobile: string; // Assuming phone is optional
  }

const apiURL ="https://us-central1-crud-testing-2b311.cloudfunctions.net/app/api/getAll";

function StudentTable() {
  const [firebase, setFirebase] = useState<Student[]>([]);
  const [editStudent, setEditStudent] = useState(false);
  const [selectStudent, setSelectStudent] = useState<Student | null>(null); // Initialize as an empty object

  const handleEditClick = (student: Student) => {
    console.log("edit clicked on ID :" + student.address);
    setEditStudent(true);
    setSelectStudent(student);
  };

  useEffect(() => {
    Axios.get(apiURL).then((response: AxiosResponse) => {
      console.log(response.data.data);
      setFirebase(response.data.data);
    })
    console.log("selected student:", selectStudent);
    
  }, [selectStudent]); // This useEffect runs whenever selectStudent changes

  return (
    <div>
      StudentTable
      <table className="w-full text-sm text-left ">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <th className="px-6 py-3">name</th>
          <th className="px-6 py-3">address</th>
          <th className="px-6 py-3">Phone number</th>
          <th className="px-6 py-3">Action</th>
        </thead>
        <tbody>
          {firebase.map((S: Student, index: number) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-gray-100 border-b-2 dark:border-gray-700"
            >
              <td className="px-2 py-3">{S.name || 'N/A'}</td>
              <td className="px-4 py-3">{S.address || 'N/A'}</td>
              <td className="px-12 py-3">{S.mobile || 'N/A'}</td>
              <td className="px-8 py-3 flex flex-row ">
                <button
                  className="rounded-md px-2 mx-1 bg-yellow-300 active:bg-yellow-600"
                  onClick={() => handleEditClick(S)}
                >
                  Edit
                </button>
                <button className="rounded-md px-2 mx-1 bg-red-300 active:bg-red-600">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStudent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <StudentForm initialValues={selectStudent || { name: '', address: '', mobile: '' }} />
            <div className="flex justify-center">
            <button
              className="rounded-md px-4 py-2 my-2 bg-red-500 text-white"
              onClick={() => setEditStudent(false)}
            >
              Cancel
            </button>
            <div></div>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
