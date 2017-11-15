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

// TODO calculate  initial workingHoursPerMonth then update on generate month

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    const { currentYear, currentMonth } = this.props;

    this.state = {
      firstName: '',
      lastName: '',
      id: '',
      workTimePercent: '',
      hours: {
        [currentYear]: {
          [currentMonth]: {}
        }
      }
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

    this.setState({
      [name]: value,
      id: id
    });
  }

  handleFormInputHours(e) {
    this.setState({ workTimePercent: e.target.value });
  }

  resetForm(e) {
    this.setState({
      firstName: '',
      lastName: '',
      id: '',
      workTimePercent: 0,
      hours: {}
    });
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
                  placeholder="Arbeitszeit - 100%"
                  name="percentFromDefaultMonth"
                  value={this.state.workTimePercent}
                  onChange={e => this.handleFormInputHours(e)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="submit"
                  onClick={e => {
                    registerEmployee(e, person);
                    this.resetForm();
                  }}
                >
                  Add
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
  currentMonth: PropTypes.number,
  registerEmployee: PropTypes.func
};

export default AddEmployee;
