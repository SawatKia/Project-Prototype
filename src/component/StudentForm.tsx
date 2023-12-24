import React, { useState, useEffect } from "react";
import { initialize } from "workbox-google-analytics";

interface StudentFormProps {
  initialValues?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    faculty?: string;
    phone?: string;
  };
}

const faculties = [
  "Engineering",
  "Science",
  "Business",
  "Education",
  "Medicine",
  "Architecture",
];

function StudentForm({ initialValues }: StudentFormProps) {
  const [formValues, setFormValues] = useState({
    id: initialValues?.id || "",
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    faculty: initialValues?.faculty || "",
    phone: initialValues?.phone || "",
  });

  useEffect(() => {
    console.log("Received initialValues:", initialValues);
    console.log("form value:",formValues);
    setFormValues({
      id: initialValues?.id || "",
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      faculty: initialValues?.faculty || "",
      phone: initialValues?.phone || "",
    });
  }, [initialValues]);

  
  return (
    <div>
      <div className="text-3xl font-bold ">Student Form</div>
      <form className="flex flex-col">
        <div id="studentID" className="flex flex-row mb-2">
          <label htmlFor="id" className="px-3 py-2">
            Student ID:{" "}
          </label>
          <input
            type="number"
            name="=id"
            value={formValues.id}
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div id="fname" className="flex flex-row mb-2">
          <label htmlFor="fName" className="px-3 py-2">
            First Name:{" "}
          </label>
          <input
            type="text"
            name="fName"
            value={formValues.firstName}
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div id="lname" className="flex flex-row mb-2">
          <label htmlFor="lname" className="px-3 py-2">
             Last name:{" "}
          </label>
          <input
            type="text"
            name="SName"
            value={formValues.lastName}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div id="faculty" className="flex flex-row">
          <label htmlFor="faculty" className="px-3 py-2">
            Faculty:{" "}
          </label>
          <select
            name="faculty"
            value={formValues.faculty}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select Faculty
            </option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
        <div id="phone-number" className="flex flex-row my-2">
          <label htmlFor="phone" className="px-3 py-2">
            Telephone:{" "}
          </label>
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="0XXXXXXXXX"
            title="please fill in specified format"
            value={formValues.phone}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
