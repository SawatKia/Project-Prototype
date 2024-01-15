import React, { useState, useEffect } from "react";
import axios from "axios";

interface StudentFormProps {
  initialValues: {
    name: string;
    address: string;
    mobile: string;
  };
}

const faculties = [
  "วิศวกรรมศาสตร์",
  "วิทยาศาสตร์",
  "บริหารธุรกิจ",
  "ครุศาสตร์",
  "แพทย์ศาสตร์",
  "สถาปัตยกรรมศาสตร์",
  "เทคโนโลยีสารสนเทศฯ",
  "ศิลปกรรมศาสตร์",
  "บัญชี",
  "นิติศาสตร์",
  "เศรษฐศาสตร์",
  "อักษรศาสตร์",
  "นิเทศศาสตร์",
];

function StudentForm({ initialValues }: StudentFormProps) {
  const [formValues, setFormValues] = useState({
    name: initialValues?.name || "",
    address: initialValues?.address || "",
    mobile: initialValues?.mobile || "",
  });

  useEffect(() => {
    console.log("Received initialValues:", initialValues);
    console.log("form value:", formValues);
    setFormValues({
      name: initialValues?.name || "",
      address: initialValues?.address || "",
      mobile: initialValues?.mobile || "",
    });
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add logic to handle form submission, e.g., sending data to the server
    console.log("Form submitted:", formValues);

    try {
      // Send data to the Create API
      const response = await axios.post(
        "https://us-central1-crud-testing-2b311.cloudfunctions.net/app/api/Create",
        formValues
      );

      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div>
      <div className="text-3xl font-bold ">Student Form</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div id="fName" className="flex flex-row mb-2">
          <label htmlFor="name" className="px-3 py-2">
            Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formValues.name}
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div id="address" className="flex flex-row">
          <label htmlFor="address" className="px-3 py-2">
            Address:{" "}
          </label>
          <select
            name="address"
            value={formValues.address}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select address
            </option>
            {faculties.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
        <div id="mobile-number" className="flex flex-row my-2">
          <label htmlFor="mobile" className="px-3 py-2">
            Mobile:{" "}
          </label>
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="0XXXXXXXXX"
            onChange={handleChange}
            value={formValues.mobile}
            title="Please fill in the specified format"
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
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