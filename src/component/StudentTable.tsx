import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    faculty: string;
    phone?: string; // Assuming phone is optional
  }

function StudentTable() {
  const students:Student[] = [
    {
      id: 61011085,
      firstName: "สวรรษ",
      lastName: "ลาภประเสริฐล้ำ",
      faculty: "วิศวกรรมศาสตร์",
      phone: "0982624677",
    },
    {
      id: 61011086,
      firstName: "ณัฐกนก",
      lastName: "ทวีศิริ",
      faculty: "เภสัชศาสตร์",
      phone: "0817108791",
    },
    {
      id: 61011087,
      firstName: "กัญญ์ภัค",
      lastName: "วงศ์สายชล",
      faculty: "วิทยาการคอมพิวเตอร์",
      phone: "0879376381",
    },
    {
      id: 61011088,
      firstName: "ธนพล",
      lastName: "แก้วมณี",
      faculty: "วิศวกรรมสำรวจ",
      phone: "0624581365",
    },
    {
      id: 61011089,
      firstName: "นฤวรรณ",
      lastName: "สังข์ทอง",
      faculty: "นิติศาสตร์",
      phone: "0613015086",
    },
  ];
  const [editStudent, setEditStudent] = useState(false);
  const [selectStudent, setSelectStudent] = useState<Partial<{
    id?: number;
    firstName?: string;
    lastName?: string;
    faculty?: string;
    phone?: string;
  }>>({}); // Initialize as an empty object

  const handleEditClick = (student: Student) => {
    console.log("edit clicked on ID :" + student.id);
    setEditStudent(true);
    setSelectStudent(student);
  };

  useEffect(() => {
    console.log("selected student:", selectStudent);
  }, [selectStudent]); // This useEffect runs whenever selectStudent changes

  return (
    <div>
      StudentTable
      <table className="w-full text-sm text-left ">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <th className="px-6 py-3">Student id</th>
          <th className="px-6 py-3">First name</th>
          <th className="px-6 py-3">last Name</th>
          <th className="px-6 py-3">Faculty</th>
          <th className="px-6 py-3">Phone number</th>
          <th className="px-6 py-3">Action</th>
        </thead>
        <tbody>
          {students.map((S, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-gray-100 border-b-2 dark:border-gray-700"
            >
              <td className="px-8 py-3">{S.id}</td>
              <td className="px-20 py-3">{S.firstName}</td>
              <td className="px-10 py-3">{S.lastName}</td>
              <td className="px-4 py-3">{S.faculty}</td>
              <td className="px-12 py-3">{S.phone}</td>
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
            <StudentForm initialValues={selectStudent}/>
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
