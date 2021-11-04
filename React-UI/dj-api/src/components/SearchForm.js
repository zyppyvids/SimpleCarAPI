import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { API_URL_CARS, QUERYCHAR, ANDCHAR, API_ID, API_VIN, API_CARPLATE, options } from '../constants';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSubmitted: false,
        cars: [],
        id: "",
        VIN: "",
        carplate: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchClick(e) {
    e.preventDefault();
    
    var requestLink = API_URL_CARS + QUERYCHAR;
    
    if(this.state.id)
      requestLink += (ANDCHAR + API_ID + this.state.id);
    if(this.state.VIN)
      requestLink += (ANDCHAR + API_VIN + this.state.VIN);
    if(this.state.carplate)
      requestLink += (ANDCHAR + API_CARPLATE + this.state.carplate);

    axios.get(requestLink, options).then(res => this.setState({ cars: res.data }));

    this.setState(({
      isSubmitted: true
    }));
  }

  handleOkClick() {
    this.setState(({
      isSubmitted: false,
      cars: [],
      id: "",
      VIN: "",
      carplate: ""
    }));
  }
   
  render() {
    if(!this.state.isSubmitted) {
      return (
        <Container>
          <h1 style={{textAlign:'center', color:'turquoise'}}>-search-</h1>
          <h5 style={{textAlign:'center', color:'gray'}}>search for a given car in the DB by its ID/VIN/Car Plate</h5>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col sm="4">
                <FloatingLabel label="Enter Car's ID">
                  <Form.Control type="text" placeholder="0" name="id" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>

              <Col sm="4">
                <FloatingLabel label="Enter Car's VIN">
                  <Form.Control type="text" placeholder="0" name="VIN" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>

              <Col sm="4">
                <FloatingLabel label="Enter Car's Plate">
                  <Form.Control type="text" placeholder="0" name="carplate" onChange={this.handleChange} />
                </FloatingLabel>
              </Col>
            </Form.Group>
            
            <br/>
            <Form.Group as={Row} className="mb-3">
                <Button variant="info" style={{backgroundColor:'turquoise', borderColor:'black'}} onClick={this.handleSearchClick}>Search</Button>
            </Form.Group>
          </Form>
        </Container>
      );
    } 
    else {
      return (
        <div style={{paddingLeft: 15, paddingRight: 15, textAlign: 'center'}}>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>VIN</th>
                <th>Car Plate</th>
                <th>Model ID</th>
              </tr>
            </thead>
            <tbody>
            {this.state.cars.map(( currCar, index ) => {
              return (
              <tr key={index}>
                <td>{currCar.id}</td>
                <td>{currCar.VIN}</td>
                <td>{currCar.carplate}</td>
                <td>{currCar.modelid}</td>
              </tr>
              );
            })}
            </tbody>
          </Table>
          <br/>
          <Form>
            <Form.Group as={Row} className="mb-3">
                <Button variant="info" style={{backgroundColor:'turquoise', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
       
}

export default SearchForm;