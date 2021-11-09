import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { FormErrors } from './FormErrors';
import { API_URL_CARS, SLASHCHAR, options } from '../constants';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            updatedCar: "",
            id: "",
            VIN: "",
            carplate: "",
            formErrors: {VIN: '', carplate: ''},
            VINValid: false,
            carplateValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.validateField(e.target.name, e.target.value));
    }

    handleUpdateClick(e) {            
        e.preventDefault();
            
        if(this.state.formValid) {
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
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let VINValid = this.state.VINValid;
        let carplateValid = this.state.carplateValid;
      
        switch(fieldName) {
          case 'VIN':
            VINValid = value.match(/^([0-9]{10})$/i);
            fieldValidationErrors.VIN = VINValid ? '' : ' should be 10 characters long! \u26A0';
            break;
          case 'carplate':
            carplateValid = value.match(/^([A-Z]{2}[0-9]{4}[A-Z]{2})$/i);
            fieldValidationErrors.carplate = carplateValid ? '': ' should be 8 characters long and be in the form of \'AA1234BB\'! \u26A0';
            break;
          default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        VINValid: VINValid,
                        carplateValid: carplateValid
                      }, this.validateForm);
    }
      
    validateForm() {
    this.setState({formValid: this.state.VINValid && this.state.carplateValid});
    }

    render() {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 style={{textAlign:'center', color:'plum'}}>-update-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>update a given car in the DB by its ID/VIN/Car Plate</h5>
                
                <div className="panel panel-default" style={{textAlign:"center"}}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

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