import React, { Component } from 'react';
import NavigationMenu from './components/NavigationMenu';
import AddEmployee from './components/AddEmployee';
import Roster from './components/Roster';

class App extends Component {
  constructor(props) {
    super(props);
    const date = new Date();

    this.state = {
      activeEmployee: '',
      activeDay: '',
      showModal: false,
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear(),
      employees: [
        {
          firstName: 'Cristian',
          lastName: 'Cristea',
          id: '_dii6bxxe3',
          workTimePercent: 75,
          hours: {
            defaultWorkDay: 23,
            totalStatus: 0,
            2017: {
              10: {
                should: 130.5,
                worked: 0,
                monthlyStatus: 0,
                workHoursPerMonth: 174,
                days: [
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X',
                  'X'
                ]
              }
            }
          }
        }
      ],
      employeesArchive: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.registerEmployee = this.registerEmployee.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.archiveEmployee = this.archiveEmployee.bind(this);
    this.updateWorkingHours = this.updateWorkingHours.bind(this);
    this.generateEmployeeWorkDays = this.generateEmployeeWorkDays.bind(this);
    this.generateRoster = this.generateRoster.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  daysInMonth(year, month) {
    // return the last day of the month
    // 0 will set the date to the last day of the previous month
    // increment month with 1 to return the last day of the  current month
    return new Date(year, month + 1, 0).getDate();
  }

  generateEmployeeWorkDays(days, workDay = 'X') {
    const row = [];
    for (let i = 1; i <= days; i++) {
      row.push(workDay);
    }

    return row;
  }

  nameCurrentMonth(monthNumber) {
    const months = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];

    return months[monthNumber];
  }

  selectEmployee(employees, id) {
    let index = -1;

    employees.forEach((employee, i) => {
      if (employee.id === id) {
        index = i;
        return;
      }
    });

    return index;
  }

  changeDay(e, value = 'D') {
    const {
      employees,
      activeDay,
      activeEmployee,
      currentYear,
      currentMonth
    } = this.state;
    const employeeIndex = this.selectEmployee(employees, activeEmployee);
    const employee = employees.splice(employeeIndex, 1)[0];

    employee.hours[currentYear][currentMonth]['days'][activeDay] = value;
    employees.splice(employeeIndex, 0, employee);
    this.setState({ employees: employees });
  }

  selectDay(e) {
    const tdElements = document.getElementsByTagName('td');
    const activeEmployee = e.target.attributes.name.value;
    const activeDay = e.target.id;

    for (let td of tdElements) {
      td.classList.remove('active-day');
    }
    e.target.classList.add('active-day');

    this.setState({
      activeEmployee: activeEmployee,
      // activeDay returns the array index
      activeDay: activeDay
    });
  }

  setWorkinkHoursMonth(percent, defaultMonth = 174) {
    return percent / 100 * defaultMonth;
  }

  // calculate and update the worked hours and status +-
  updateWorkingHours() {
    const { employees, activeEmployee, currentMonth, currentYear } = this.state;
    const employeeIndex = this.selectEmployee(employees, activeEmployee);
    const employee = employees.splice(employeeIndex, 1)[0];
    const workedDays = employee.hours[currentYear][currentMonth]['days'].filter(
      day => day === 'D'
    ).length;
    let workedHours = employee.hours.defaultWorkDay * workedDays;
    let shouldWorkHours = employee.hours[currentYear][currentMonth]['should'];
    let monthlyStatus =
      workedHours > shouldWorkHours
        ? workedHours - shouldWorkHours
        : -(shouldWorkHours - workedHours);

    employee.hours.worked = workedHours;
    employee.hours[currentYear][currentMonth]['monthlyStatus'] = monthlyStatus;
    employees.splice(employeeIndex, 0, employee);

    this.setState({ employees: employees });
  }

  registerEmployee(e, person) {
    // TODO: calculate work hours for every month
    e.preventDefault();
    const { employees, currentYear, currentMonth } = this.state;

    person.hours.defaultWorkDay = 23;
    person.hours.totalStatus = 0;
    person.hours[currentYear][currentMonth]['worked'] = 0;
    person.hours[currentYear][currentMonth]['monthlyStatus'] = 0;
    person.hours[currentYear][currentMonth]['workHoursPerMonth'] = 174;
    person.hours[currentYear][currentMonth][
      'should'
    ] = this.setWorkinkHoursMonth(person.workTimePercent);
    person['days'] = this.generateEmployeeWorkDays(
      this.daysInMonth(currentYear, currentMonth)
    );

    employees.push(person);
    this.setState({ employees: employees });
    this.closeModal();
  }

  archiveEmployee() {
    const { employees, activeEmployee, employeesArchive } = this.state;
    const employeeIndex = this.selectEmployee(employees, activeEmployee);
    const employee = employees.splice(employeeIndex, 1)[0];

    employeesArchive.push(employee);

    this.setState({
      employees: employees,
      employeesArchive: employeesArchive
    });
  }

  generateRoster() {
    // check if the year exists
    // check if next month exists
    // loop through all employees and add a year? and month
    // change currentYear and currentMonth to the generated one
    const { currentYear, currentMonth, employees } = this.state;

    employees.map(employee => {
      if (employee[currentYear]) {
        console.log(currentYear);
      } else {
        console.log(currentYear + 1);
      }
    });
  }

  selectMonth(year, month) {
    // change the currentYear and currentMonth
  }

  render() {
    const { currentMonth, currentYear } = this.state;
    let daysInMonth = this.daysInMonth(currentYear, currentMonth);
    return (
      <div className="App">
        <NavigationMenu
          openModal={() => this.openModal()}
          changeDay={this.changeDay}
          archiveEmployee={this.archiveEmployee}
          updateWorkingHours={this.updateWorkingHours}
          generateRoster={this.generateRoster}
        />
        {/* <SucessMessage name="Mitarbeiter hinzugefügt" />  */}
        <AddEmployee
          showModal={this.state.showModal}
          closeModal={() => this.closeModal()}
          openModal={() => this.openModal()}
          registerEmployee={this.registerEmployee}
          daysInMonth={daysInMonth}
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
          generateEmployeeWorkDays={this.generateEmployeeWorkDays}
        />
        <Roster
          selectDay={this.selectDay}
          employees={this.state.employees}
          daysInMonth={daysInMonth}
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
        />
      </div>
    );
  }
}

export default App;
