import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const NavigationMenu = ({
  openModal,
  changeDay,
  archiveEmployee,
  updateWorkingHours,
  generateRoster
}) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Dienstplan</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#" onClick={openModal}>
          Add Employee
        </NavItem>
        <NavItem eventKey={2} href="#" onClick={archiveEmployee}>
          Remove Employee
        </NavItem>
        <NavItem eventKey={3} href="#" onClick={generateRoster}>
          New Dienstplan
        </NavItem>
        <NavItem
          eventKey={4}
          href="#"
          onClick={e => {
            changeDay(e, 'F');
            updateWorkingHours();
          }}
        >
          F
        </NavItem>
        <NavItem
          eventKey={5}
          href="#"
          onClick={e => {
            changeDay(e, 'S');
            updateWorkingHours();
          }}
        >
          S
        </NavItem>
        <NavItem
          eventKey={6}
          href="#"
          onClick={e => {
            changeDay(e, 'X');
            updateWorkingHours();
          }}
        >
          X
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationMenu;
