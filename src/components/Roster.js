import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';

class Roster extends Component {
  constructor(props) {
    super(props);

    this.generateWeekendDays = this.generateWeekendDays.bind(this);
    this.isWeekend = this.isWeekend.bind(this);
  }

  generateDays(days) {
    const row = [];
    for (let i = 1; i <= days; i++) {
      row.push(i);
    }
    return row;
  }

  // generate date from day number
  generateDate() {}

  generateWeekendDays(year, month) {
    const date = new Date(year, month, 1);
    let daysToWeekend = 6 - date.getDay();
    let firstWeekendDay = date.getDate() + daysToWeekend;
    const weekendDays = [];
    let saturday = firstWeekendDay;
    let sunday = firstWeekendDay + 1;

    while (
      saturday <= this.props.daysInMonth ||
      sunday <= this.props.daysInMonth
    ) {
      weekendDays.push(saturday, sunday);
      saturday += 7;
      sunday += 7;
    }

    return weekendDays;
  }

  // check if it is a weekend day
  isWeekend(day) {
    const { currentYear, currentMonth } = this.props;
    const weekendDays = this.generateWeekendDays(currentYear, currentMonth);

    return weekendDays.indexOf(day) !== -1;
  }

  render() {
    const { employees, daysInMonth, currentYear, currentMonth } = this.props;

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {this.generateDays(daysInMonth).map((row, i) => {
              return (
                <th
                  key={row}
                  className={this.isWeekend(i + 1) ? 'weekend-day' : null}
                >
                  {row}
                </th>
              );
            })}
            <th>Soll</th>
            <th>Ist</th>
            <th>Std</th>
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
                currentYear={currentYear}
                currentMonth={currentMonth}
                generateWeekendDays={this.generateWeekendDays}
                isWeekend={this.isWeekend}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Roster;
