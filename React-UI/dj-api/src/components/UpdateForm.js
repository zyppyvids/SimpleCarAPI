import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_URL_CARS, SLASHCHAR, options } from '../constants';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            updatedCar: "",
            id: "",
            VIN: "",
            carplate: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleUpdateClick(e) {
        e.preventDefault();
        
        var requestLink = API_URL_CARS + SLASHCHAR + this.state.id;
        
        // JSON Body build
        var jsonBody = "{";

        if(this.state.VIN)
            jsonBody += ("\"VIN\": ".concat("\"", this.state.VIN, "\","));
        if(this.state.carplate)
            jsonBody += ("\"carplate\": ".concat("\"", this.state.carplate, "\","));

        // Removes last ',' if there is one
        if(jsonBody.charAt(jsonBody.length - 1) === ',')
            jsonBody = jsonBody.slice(0, -1);
        
        jsonBody += "}";

        // Updates the requested object then gets it by its id and displays it to the user
        // get is in the put's then clause because we want to ensure these steps are one after the other
        axios.put(requestLink, jsonBody, options).then(() => axios.get(requestLink, options).then(res => this.setState({ updatedCar: res.data, isSubmitted: true })));
    }

    handleOkClick() {
        this.setState(({
          isSubmitted: false,
          updatedCar: "",
          id: "",
          VIN: "",
          carplate: ""
        }));
    }

    render() {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 style={{textAlign:'center', color:'plum'}}>-update-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>update a given car in the DB by its ID/VIN/Car Plate</h5>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGroup">
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
                        <Button variant="info" style={{backgroundColor:'plum', borderColor:'black'}} onClick={this.handleUpdateClick}>Update</Button>
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
                            <tr key="1">
                                <td>{this.state.updatedCar.id}</td>
                                <td>{this.state.updatedCar.VIN}</td>
                                <td>{this.state.updatedCar.carplate}</td>
                                <td>{this.state.updatedCar.modelid}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Button variant="info" style={{backgroundColor:'plum', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
                        </Form.Group>
                    </Form>
                </div>
            );        
        }
    }  
}

export default UpdateForm;