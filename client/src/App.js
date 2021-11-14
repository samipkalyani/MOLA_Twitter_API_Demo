import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import UserExists from './components/UserExists';
// Bootstrap imports
import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
// Stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <React.Fragment>
      {/* ---- Navbar starts here ---- */}
      <Navbar bg="primary">
        <Container>
        <Navbar.Brand>
          <a href="/" style={{textDecoration: "None"}}>
            <i style={{fontSize: 20, color: '#fff'}} class="bi bi-twitter"></i>
            <span style={{marginLeft: 10, fontSize: 20, color: '#fff'}}> Twitter API </span>
          </a>
        </Navbar.Brand>
        </Container>
      </Navbar>
      {/* ---- Navbar ends here ---- */}

      {/* Routing */}
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/user'>
            <UserExists />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
