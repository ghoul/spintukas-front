import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/smile.png";
import logo from "../assets/images/logos/spintukas.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate  = useNavigate();

  let admin = localStorage.getItem('admin');
  admin = admin === 'true';
  let token = localStorage.getItem('token'); 
  let logged = localStorage.getItem('token') != null;


  

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
    
  };

  return (
    <Navbar style={{ backgroundColor: '#181A1F' }} dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/">
          <img
              src={logo}
              alt="logo"
              width="70"
            ></img>
        </NavbarBrand>
        
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical" ></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          
          <NavItem style={{'marginLeft':'28px'}}>
            <Link to="/about" className="nav-link" style={{ color: 'white' }}>
              Apie
            </Link>
          </NavItem>
          {logged && (<NavItem>
            <Link to="/defects" className="nav-link" style={{ color: 'white' }}>
              Defektų registras
            </Link>
          </NavItem>
          )}
        {logged && (< NavItem>
          <Link to="/defect/create" className="nav-link" style={{ color: 'white' }}>
            Registruoti defektą
          </Link>
        </NavItem>
        )}
      {!logged && (
          <NavItem>
            <Link to="/login" className="nav-link" style={{ color: 'white' }}>
              Prisijungti
            </Link>
          </NavItem>
      )}
          {!logged && (<NavItem>
            <Link to="/signup" className="nav-link" style={{ color: 'white' }}>
              Registruotis
            </Link>
          </NavItem>
          )}
        </Nav>
        {logged && (
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="50"
              height="50"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Nustatymai</DropdownItem>
            {/* <DropdownItem>Profilis</DropdownItem> */}
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Atsijungti</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )}
      </Collapse>
    </Navbar>
  );
};

export default Header;
