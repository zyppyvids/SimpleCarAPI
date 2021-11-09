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
import { API_URL_CARS, API_URL_CARMODELS, QUERYCHAR, ANDCHAR, API_VIN, options } from '../constants';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            isLoading: true,
            isSubmitted: false,
            VIN: "",
            carplate: "",
            modelid: "",
            createdCar: "",
            formErrors: {VIN: '', carplate: ''},
            VINValid: false,
            carplateValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    componentDidMount() {
        axios.get(API_URL_CARMODELS, options).then(res => this.setState({ models: res.data, modelid: (res.data.length === 0 ? "" : res.data[0].id), isLoading: false })).catch((error) => {
            console.log(error);
            this.setState({isLoading: false});
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { this.validateField(e.target.name, e.target.value) });
    }

    handleSelectChange(e) {
        this.setState({ modelid: e.target.value });
    }

    handleCreateClick(e) {
        e.preventDefault();
        if(this.state.formValid) {
            var getRequestLink = API_URL_CARS + QUERYCHAR + ANDCHAR + API_VIN + this.state.VIN
            
            // JSON Body build
            var jsonBody = "{";

            if(this.state.VIN)
                jsonBody += ("\"VIN\": ".concat("\"", this.state.VIN, "\","));
            if(this.state.carplate)
                jsonBody += ("\"carplate\": ".concat("\"", this.state.carplate, "\","));
            if(this.state.modelid)
                jsonBody += ("\"modelid\": ".concat(this.state.modelid));

            // Removes last ',' if there is one
            if(jsonBody.charAt(jsonBody.length - 1) === ',')
                jsonBody = jsonBody.slice(0, -1);
            
            jsonBody += "}";
            
            axios.post(API_URL_CARS, jsonBody, options).then(() => axios.get(getRequestLink, options).then(res => this.setState({ createdCar: res.data[0], isSubmitted: true })));
        }
    }

    handleOkClick() {
        this.setState(({
            isSubmitted: false,
            VIN: "",
            carplate: "",
            modelid: "",
            createdCar: "",
            formErrors: {VIN: '', carplate: ''},
            VINValid: false,
            carplateValid: false,
            formValid: false
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
    const { models } = this.state;

	let modelsList = models.length > 0
		&& models.map((item, iterator) => {
		return (
			<option key={iterator} value={item.id}>{item.model} [{item.year}]</option>
		)
	}, this);
    if(!this.state.isLoading) {
        if(!this.state.isSubmitted) {
            return (
                <Container>
                <h1 style={{textAlign:'center', color:'rgb(40, 150, 250)'}}>-create-</h1>
                <h5 style={{textAlign:'center', color:'gray'}}>create a car by its VIN/Car Plate/Model</h5>
      
                <div className="panel panel-default" style={{textAlign:"center"}}>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formGroup">
                    <Col sm="4">
                        <FloatingLabel label="Enter Car's VIN">
                        <Form.Control type="text" placeholder="0" name="VIN" onChange={this.handleChange}/>
                        </FloatingLabel>
                    </Col>

                    <Col sm="4">
                        <FloatingLabel label="Enter Car's Plate">
                        <Form.Control type="text" placeholder="0" name="carplate" onChange={this.handleChange}/>
                        </FloatingLabel>
                    </Col>

                    <Col sm="4">
                        <FloatingLabel label="Select Car's Model">
                        <Form.Select placeholder="0" onChange={this.handleSelectChange}>
                            {modelsList}
                        </Form.Select>
                        </FloatingLabel>
                    </Col>
                    </Form.Group>

                    <br/>
                    <Form.Group as={Row} className="mb-3">
                        <Button variant="info" style={{backgroundColor:'rgb(40, 150, 250)', borderColor:'black'}} onClick={this.handleCreateClick}>Create</Button>
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
                                <td>{this.state.createdCar.id}</td>
                                <td>{this.state.createdCar.VIN}</td>
                                <td>{this.state.createdCar.carplate}</td>
                                <td>{this.state.createdCar.modelid}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br/>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Button variant="info" style={{backgroundColor:'rgb(40, 150, 250)', borderColor:'black'}} onClick={this.handleOkClick}>OK!</Button>
                        </Form.Group>
                    </Form>
                </div>
            );        
        }
    }
    else {
        return (
            <Container>
                <h1 style={{textAlign:'center', color:'rgb(40, 150, 250)'}}>...</h1>
            </Container>
        );
    }
}
    
}

export default CreateForm;