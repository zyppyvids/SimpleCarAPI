import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import axios from 'axios';
import { API_URL_CARS, options } from '../constants';

class DeleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cars: [],
        id: "",
        isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    axios.get(API_URL_CARS, options).then(res => this.setState({ cars: res.data, id: (res.data.length === 0 ? "" : res.data[0].id), isLoading: false })).catch((error) => {
      console.log(error);
      this.setState({isLoading: false});
    });  
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleDeleteClick(e) {
    e.preventDefault();
   
    axios.delete(API_URL_CARS.concat("/", this.state.id), options).then(() => axios.get(API_URL_CARS, options).then(res => this.setState({ cars: res.data, id: (res.data.length === 0 ? "" : res.data[0].id) })));
  }

  render() {
    const { cars } = this.state;

	  let carsList = cars.length > 0
      && cars.map((item, iterator) => {
      return (
        <option style={{textAlign: "center"}} key={iterator} value={item.id}>[{item.id}] [{item.VIN}] [{item.carplate}]</option>
      )
	  }, this);

    if(!this.state.isLoading)
    {
      return (
          <Container>
          <h1 style={{textAlign:'center', color:'rgb(243, 80, 80)'}}>-delete-</h1>
          <h5 style={{textAlign:'center', color:'gray'}}>delete a car by selecting it</h5>
          <Form>
              <Form.Group as={Row} className="mb-3" controlId="formGroup">
              <Col sm="12">
                <FloatingLabel label="Select Car">
                <Form.Select placeholder="0" onChange={this.handleChange}>
                {carsList}
                </Form.Select>
                </FloatingLabel>
              </Col>
              </Form.Group>

              <br/>
              <Form.Group as={Row} className="mb-3">
                <Button variant="info" style={{backgroundColor:'rgb(243, 80, 80)', borderColor:'black'}} onClick={this.handleDeleteClick}>Delete</Button>
              </Form.Group>
          </Form>
          </Container>
      );
    }
    else {
      return (
        <Container>
          <h1 style={{textAlign:'center', color:'rgb(243, 80, 80)'}}>...</h1>
        </Container>
      );
    }
  }
}

export default DeleteForm;