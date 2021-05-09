import React from "react";

const EmployeeFields = (props) => {
  return (
    props.employees.map(employee => <tr>
      <td> <img src ={employee.picture} alt= "Employee"/> </td>
      <td>{employee.name}</td>     
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
    </tr>)
    );
};

export default EmployeeFields;