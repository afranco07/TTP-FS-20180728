import React, { Component } from 'react';
import { Form, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event, { name, value }) {
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleSubmit() {
    console.log(this.state);
    this.setState(() => {
      return { email: '', password: ''};
    });
  }

  render() {
    return (
      <Container text>
        <Header size="huge">Sign In</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder="E-Mail" name="email" value={this.state.email} onChange={this.handleInputChange} type="email" required/>
          <Form.Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
          <Form.Button>Submit</Form.Button>
        </Form>
        <Link to="/register">Register</Link>
      </Container>
    );
  }
}

export default SignInPage;
