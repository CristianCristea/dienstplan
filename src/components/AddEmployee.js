import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col
} from 'react-bootstrap';

// TODO: reset form after submit

class AddEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      workingHours: 0,
      id: ''
    };
  }

  generateId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  handleFormInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const id = this.generateId();
    const generateEmployeeWorkDays = this.generateEmployeeWorkDays(
      this.props.daysInMonth
    );

    this.setState({
      [name]: value,
      id: id,
      currentDaysInMonth: generateEmployeeWorkDays
    });
  }

  generateEmployeeWorkDays(days, workDay = 'X') {
    const row = [];
    for (let i = 1; i <= days; i++) {
      row.push(workDay);
    }

    return row;
  }

  render() {
    const { showModal, closeModal, registerEmployee } = this.props;
    const person = this.state;

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mitarbeiter hinzufügen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="firstName">
              <Col componentClass={ControlLabel} sm={2}>
                Vorname
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  placeholder="Vorname"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={e => this.handleFormInput(e)}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="lastName">
              <Col componentClass={ControlLabel} sm={2}>
                Nachname
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  placeholder="Nachname"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={e => this.handleFormInput(e)}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="workingHours">
              <Col componentClass={ControlLabel} sm={2}>
                Arbeitszeit
              </Col>
              <Col sm={10}>
                <FormControl
                  type="number"
                  placeholder="Arbeitszeit - Stunden"
                  name="workingHours"
                  value={this.state.workingHours}
                  onChange={e => this.handleFormInput(e)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="submit"
                  onClick={e => registerEmployee(e, person)}
                >
                  Hinfügen
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddEmployee.propTypes = {
  showModal: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  daysInMonth: PropTypes.number,
  currentMonth: PropTypes.string,
  registerEmployee: PropTypes.func
};

export default AddEmployee;
