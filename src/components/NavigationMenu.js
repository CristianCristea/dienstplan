import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const NavigationMenu = ({ openModal }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Dienstplan</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#" onClick={openModal}>
          Mitarbeiter hinzufügen
        </NavItem>
        <NavItem eventKey={2} href="#">
          Mitarbeiter entfernen
        </NavItem>
        <NavItem eventKey={4} href="#">
          D
        </NavItem>
        <NavItem eventKey={5} href="#">
          X
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationMenu;
