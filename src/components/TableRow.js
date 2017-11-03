import React from 'react';

const TableRow = ({ fillEmployeeRow, employee, selectDay, employeeNumber }) => {
  return (
    <tr key={employee.id}>
      <td>{employeeNumber}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      {fillEmployeeRow(30, 'X').map(row => (
        <td key={employee.id++} onClick={selectDay}>
          {row}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
