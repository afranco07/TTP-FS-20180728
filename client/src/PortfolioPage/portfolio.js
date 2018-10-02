import React, { Component } from 'react';
import { Form, Container, Header, Grid } from 'semantic-ui-react';

class PortfolioPage extends Component {
  constructor() {
    super();
    this.state = {
        ticker: '',
        quantity: ''
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
    this.setState(() => {
      return { ticker: '', quantity: '' };
    });
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Header size="huge">Portfolio</Header>
        <Grid container columns={2} divided>
            <Grid.Column>test1</Grid.Column>
            <Grid.Column onSubmit={this.handleSubmit}>
                <Header size="large">Cash - $ 5000.00</Header>
                <Form>
                    <Form.Input placeholder="Ticker" name="ticker" value={this.state.ticker} onChange={this.handleInputChange} required />
                    <Form.Input placeholder="Qty" name="quantity" value={this.state.quantity} onChange={this.handleInputChange} required />
                    <Form.Button>Buy</Form.Button>
                </Form>
            </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default PortfolioPage;
