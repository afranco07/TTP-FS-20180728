import React, { Component } from 'react';
import { Form, Container, Header } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class RegisterPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      name: '',
      password: '',
      redirect: localStorage.getItem("login")
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
    let postData = { ...this.state };
    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }
    fetch('/api/user', data);
    this.setState(() => {
      return { email: '', password: '', name: ''};
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/"/>;
    }

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
