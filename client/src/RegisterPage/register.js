import React, { Component } from 'react';
import { Form, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      name: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event, { name, value }) {
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleSubmit() {
    this.setState(() => {
      return { email: '', password: '', name: ''};
    });
  }

  render() {
    return (
      <Container text>
        <Header size="huge">Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder="Name" name="name" value={this.state.name} onChange={this.handleInputChange} required/>
          <Form.Input placeholder="E-Mail" name="email" value={this.state.email} onChange={this.handleInputChange} required type="email"/>
          <Form.Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
          <Form.Button>Submit</Form.Button>
        </Form>
        <Link to="/signin">Sign-In</Link>
      </Container>
    );
  }
}

export default RegisterPage;
