import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import NavigationMenu from './components/NavigationMenu';
import AddEmployee from './components/AddEmployee';
import Roster from './components/Roster';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currentMonth: '',
      currentYear: '',
      daysInMonth: 0,
      employees: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.registerEmployee = this.registerEmployee.bind(this);
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

  registerEmployee(e, person) {
    e.preventDefault();
    const { employees } = this.state;
    employees.push(person);
    this.setState({ employees: employees });
    this.closeModal();
  }

  componentDidMount() {
    const currentMonth = this.getCurrentMonth();
    const currentYear = this.getCurrentYear();
    const daysInMonth = this.daysInMonth(currentYear, currentMonth);

    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear,
      daysInMonth: daysInMonth
    });
  }

  render() {
    return (
      <div className="App">
        <NavigationMenu openModal={() => this.openModal()} />
        {/* <SucessMessage name="Mitarbeiter hinzugefügt" />  */}
        <AddEmployee
          showModal={this.state.showModal}
          closeModal={() => this.closeModal()}
          openModal={() => this.openModal()}
          registerEmployee={this.registerEmployee}
        />
        <Roster
          employees={this.state.employees}
          daysInMonth={this.state.daysInMonth}
        />
      </div>
    );
  }
}

export default App;
