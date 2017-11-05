import React from 'react';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';

class Roster extends React.Component {
  generateMonthDays(days) {
    const row = [];
    for (let i = 1; i <= days; i++) {
      row.push(i);
    }

    return row;
  }

  render() {
    const { employees } = this.props;

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {this.generateMonthDays(30).map(row => <th key={row}>{row}</th>)}
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => {
            return (
              <TableRow
                key={employee.id}
                employee={employee}
                employeeNumber={employees.indexOf(employee)}
                selectDay={this.props.selectDay}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Roster;
