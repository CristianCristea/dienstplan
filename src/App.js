import React, { Component } from 'react';
import NavigationMenu from './components/NavigationMenu';
import AddEmployee from './components/AddEmployee';
import Roster from './components/Roster';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeEmployee: '',
      activeDay: '',
      showModal: false,
      currentMonth: '',
      currentYear: '',
      employees: [
        {
          firstName: 'Cristian',
          lastName: 'Cristea',
          id: '_dii6bxxe3',
          hours: {
            should: 130.5,
            worked: 0,
            status: 0,
            defaultDay: 23,
            defaultMonth: 174,
            percentFromDefaultMonth: 75
          },
          currentDaysInMonth: [
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
      ],
      employeesArchive: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.registerEmployee = this.registerEmployee.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.archiveEmployee = this.archiveEmployee.bind(this);
    this.updateWorkingHours = this.updateWorkingHours.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getCurrentMonth() {
    return new Date().getMonth();
  }

  daysInMonth(year, month) {
    // return the last day of the month
    // 0 will set the date to the last day of the previous month
    // increment month with 1 to return the last day of the  current month
    return new Date(year, month + 1, 0).getDate();
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
    const { employees, activeDay, activeEmployee } = this.state;
    const employeeIndex = this.selectEmployee(employees, activeEmployee);
    const employee = employees.splice(employeeIndex, 1)[0];

    employee.currentDaysInMonth[activeDay] = value;
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
      activeDay: activeDay
    });
  }

  setWorkinkHoursMonth(percent, defaultMonth = 174) {
    return percent / 100 * defaultMonth;
  }

  // calculate and update the worked hours and status +-
  updateWorkingHours() {
    const { employees, activeEmployee } = this.state;
    const employeeIndex = this.selectEmployee(employees, activeEmployee);
    const employee = employees.splice(employeeIndex, 1)[0];
    const workedDays = employee.currentDaysInMonth.filter(day => day === 'D')
      .length;
    let workedHours = employee.hours.defaultDay * workedDays;
    let status =
      workedHours > employee.hours.should
        ? workedHours - employee.hours.should
        : -(employee.hours.should - workedHours);

    employee.hours.worked = workedHours;
    employee.hours.status = status;
    employees.splice(employeeIndex, 0, employee);

    this.setState({ employees: employees });
    console.log(status);
  }

  registerEmployee(e, person) {
    e.preventDefault();
    const { employees } = this.state;
    person.hours.should = this.setWorkinkHoursMonth(
      person.hours.percentFromDefaultMonth
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

  componentDidMount() {
    const currentMonth = this.getCurrentMonth();
    const currentYear = this.getCurrentYear();

    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    });
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
        />
        {/* <SucessMessage name="Mitarbeiter hinzugefügt" />  */}
        <AddEmployee
          showModal={this.state.showModal}
          closeModal={() => this.closeModal()}
          openModal={() => this.openModal()}
          registerEmployee={this.registerEmployee}
          daysInMonth={daysInMonth}
        />
        <Roster
          selectDay={this.selectDay}
          employees={this.state.employees}
          daysInMonth={this.state.daysInMonth}
        />
      </div>
    );
  }
}

export default App;
