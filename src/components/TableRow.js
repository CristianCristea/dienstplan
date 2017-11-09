import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  employee,
  selectDay,
  employeeNumber,
  currentYear,
  currentMonth
}) => {
  return (
    <tr key={employee.id}>
      <td>{employeeNumber}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      {employee.currentDaysInMonth.map((day, i) => {
        return (
          <td
            name={employee.id}
            id={i}
            key={employee.id + i}
            onClick={e => selectDay(e)}
          >
            {employee.currentDaysInMonth[i]}
          </td>
        );
      })}

      <td>{employee.hours[currentYear][currentMonth]['should']}</td>
      <td>{employee.hours[currentYear][currentMonth]['worked']}</td>
      <td>{employee.hours[currentYear][currentMonth]['monthlyStatus']}</td>
    </tr>
  );
};

TableRow.propTypes = {
  employee: PropTypes.object,
  selectDay: PropTypes.func,
  employeeNumber: PropTypes.number
};

export default TableRow;
