import React from "react";
import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return(
    <div className="fixed-bottom"> 
        <Navbar bg="primary">
            <Container>
            <Navbar.Brand>
                <span style={{marginLeft: 10, fontSize: 16, color: '#fff'}}>© Samip Kalyani 2021</span>
            </Navbar.Brand>
            <div style={{fontSize: 16, color: '#fff'}} >Morality and Language Lab (MOLA)</div>
            </Container>
        </Navbar>
    </div>
  )
}

export default Footer;