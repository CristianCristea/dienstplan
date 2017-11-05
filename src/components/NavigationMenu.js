import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const NavigationMenu = ({ openModal, changeDay, archiveEmployee }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Dienstplan</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#" onClick={openModal}>
          Mitarbeiter hinzufügen
        </NavItem>
        <NavItem eventKey={2} href="#" onClick={archiveEmployee}>
          Mitarbeiter entfernen
        </NavItem>
        <NavItem eventKey={4} href="#" onClick={e => changeDay(e, 'D')}>
          D
        </NavItem>
        <NavItem eventKey={5} href="#" onClick={e => changeDay(e, 'X')}>
          X
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationMenu;
