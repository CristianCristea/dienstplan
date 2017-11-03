import React from 'react';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';

class Roster extends React.Component {
  fillTableRow(days, workDay) {
    const row = [];
    for (let i = 1; i <= days; i++) {
      if (!workDay) {
        row.push(i);
      } else {
        row.push(workDay);
      }
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
            {this.fillTableRow(30).map(row => <th>{row}</th>)}
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => {
            return (
              <TableRow
                employee={employee}
                employeeNumber={employees.indexOf(employee)}
                fillEmployeeRow={this.fillTableRow}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Roster;
