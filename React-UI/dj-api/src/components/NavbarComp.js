import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavbarComp extends Component {
    render() {
        return (
        <Navbar bg="light" variant="light" expand="lg" style={{position: 'fixed', width: '100%'}}>
            <Container>
                <Navbar.Brand><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fdotty%2FTransport%2Fcar1600.png&f=1&nofb=1" width={50} height={50} alt="-car-"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => this.props.handleClick('search')}>-search-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('update')}>-update-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('create')}>-create-</Nav.Link>
                    <Nav.Link onClick={() => this.props.handleClick('delete')}>-delete-</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
        );
    }
}

export default NavbarComp;