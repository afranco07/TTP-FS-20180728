import React, { Component } from 'react';
import { Form, Container, Header, Message } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: localStorage.getItem("login"),
      failedLogin: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  handleInputChange(event, { name, value }) {
    this.setState(() => {
      return { [name]: value };
    });
  }

  handleSubmit() {
    this.getToken();
    this.setState(() => {
      return { email: '', password: ''};
    });
  }

  getToken() {
    let postData = { ...this.state };
    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }
    fetch('/auth/login', data)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(json => {
        console.log(json.token);
        localStorage.setItem("login", json.token);
        localStorage.setItem("id", json.user.id);
        this.setState(() => {
          return { redirect: true };
        });
      })
      .catch(e => {
        console.log(e)
        this.setState(() => {
          return { failedLogin: true};
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/"/>;
    }

    return (
      <Container text>
        <Header size="huge">Sign In</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder="E-Mail" name="email" value={this.state.email} onChange={this.handleInputChange} type="email" required/>
          <Form.Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
          <Form.Button>Submit</Form.Button>
        </Form>
        { this.state.failedLogin && <Message content="Failed login"/>}
        <Link to="/register">Register</Link>
      </Container>
    );
  }
}

export default SignInPage;
