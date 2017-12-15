import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  employee,
  selectDay,
  employeeNumber,
  currentYear,
  currentMonth,
  generateWeekendDays,
  isWeekend
}) => {
  return (
    <tr key={employee.id}>
      <td>{employeeNumber}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      {employee.hours[currentYear][currentMonth]['days'].map((day, i) => {
        return (
          <td
            className={`${
              day === 'F' || day === 'S'
                ? 'work-day'
                : isWeekend(i + 1) ? 'weekend-day' : 'normal-day'
            }`}
            name={employee.id}
            id={i}
            key={employee.id + i}
            onClick={e => selectDay(e)}
          >
            {employee.hours[currentYear][currentMonth]['days'][i]}
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
