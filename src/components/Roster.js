import React from 'react';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';

class Roster extends React.Component {
  generateDays(days) {
    const row = [];
    for (let i = 1; i <= days; i++) {
      row.push(i);
    }
    return row;
  }

  render() {
    const { employees, daysInMonth, currentYear, currentMonth } = this.props;

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {this.generateDays(daysInMonth).map(row => (
              <th key={row}>{row}</th>
            ))}
            <th>Soll</th>
            <th>Ist</th>
            <th>Std</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => {
            console.log(employee);

            return (
              <TableRow
                key={employee.id}
                employee={employee}
                employeeNumber={employees.indexOf(employee)}
                selectDay={this.props.selectDay}
                currentYear={currentYear}
                currentMonth={currentMonth}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Roster;
