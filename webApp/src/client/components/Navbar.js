import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <h6 className='mt-1'>Incident Detection System</h6>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/users">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search">Search Tool</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/alerts">Alerting</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;