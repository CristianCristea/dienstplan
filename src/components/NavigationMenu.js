import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const NavigationMenu = ({
  openModal,
  changeDay,
  archiveEmployee,
  updateWorkingHours
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
        <NavItem
          eventKey={4}
          href="#"
          onClick={e => {
            changeDay(e, 'D');
            updateWorkingHours();
          }}
        >
          D
        </NavItem>
        <NavItem
          eventKey={5}
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
