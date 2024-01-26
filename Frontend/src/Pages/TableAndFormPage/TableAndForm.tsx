import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import StudentForm from "../../component/StudentForm";
import StudentTable from "../../component/StudentTable";

 function TableAndForm(){
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  //  useEffect(() => {
  //   const checkAuthentication = () => {
  //     //THIS IS STATIC VALUE OF USERNAME & PASSWORD
  //     const username = 'demo_user';
  //     const password = 'password';

  //     const authenticated = ??;

  //     setIsAuthenticated(authenticated);
  //   };

  //   checkAuthentication();
  // }, []);
 
  // if (!isAuthenticated) {
  //   console.log('User is not authenticated');
  //   return <Navigate to="/login" />;
  // }

  return(
    <div className="App font-['Kanit']">
      <div className="text-3xl font-bold ">Home</div>
      <StudentForm initialValues={{ name: '', address: '', mobile: '' }}/>
      <StudentTable/>
    </div>
  )
 }

 export default TableAndForm;