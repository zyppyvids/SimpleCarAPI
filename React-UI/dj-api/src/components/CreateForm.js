import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_URL_CARS, API_URL_CARMODELS, QUERYCHAR, ANDCHAR, API_VIN, options } from '../constants';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            isSubmitted: false,
            VIN: "",
            carplate: "",
            modelid: "",
            createdCar: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
    }

    componentDidMount() {
        axios.get(API_URL_CARMODELS, options).then(res => this.setState({ models: res.data, modelid: (res.data.length === 0 ? "" : res.data[0].id) }));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectChange(e) {
        this.setState({ modelid: e.target.value });
    }

    handleCreateClick(e) {
        e.preventDefault();

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
        
        axios.post(API_URL_CARS, jsonBody, options).then(() => axios.get(getRequestLink, options).then(res => this.setState({ createdCar: res.data[0] })));
        
        this.setState(({
            isSubmitted: true
        }));
    }

    handleOkClick() {
        this.setState(({
            isSubmitted: false,
            VIN: "",
            carplate: "",
            modelid: "",
            createdCar: ""
        }));
    }

    render() {
    const { models } = this.state;

	let modelsList = models.length > 0
		&& models.map((item, iterator) => {
		return (
			<option key={iterator} value={item.id}>{item.model} [{item.year}]</option>
		)
	}, this);
    if(!this.state.isSubmitted) {
        return (
            <Container>
            <h1 style={{textAlign:'center', color:'rgb(40, 150, 250)'}}>-create-</h1>
            <h5 style={{textAlign:'center', color:'gray'}}>create a car by its VIN/Car Plate/Model</h5>
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
    
}

export default CreateForm;