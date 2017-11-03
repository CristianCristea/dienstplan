import React from 'react';

const TableRow = ({ fillEmployeeRow, employee, employeeNumber }) => {
  return (
    <tr>
      <td>{employeeNumber}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      {fillEmployeeRow(30, 'X').map(row => <td>{row}</td>)}
    </tr>
  );
};

export default TableRow;
