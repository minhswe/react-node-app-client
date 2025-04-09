import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import { Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayPhoneList from './components/DisplayPhoneList';
import AddSmartPhone from './components/AddSmartphone';
import Register from './components/Register';
import SignIn from './components/SignIn';
// const API_URL = 'http://localhost:8080';

function App() {
  return (
    <>
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Phone Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/smartphones">Smartphone List</Nav.Link>
              <Nav.Link as={Link} to="/add-phone">Add Phone</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/smartphones" element={<DisplayPhoneList />} />
          <Route path="/add-phone" element={<AddSmartPhone />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </Container>
    </Router>
    </>
  );
}
export default App