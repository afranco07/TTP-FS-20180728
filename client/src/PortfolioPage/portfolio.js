import React, { Component } from 'react';
import { Form, Container, Header, Grid, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class PortfolioPage extends Component {
  constructor() {
    super();
    this.state = {
        ticker: '',
        quantity: '',
        isLoggedIn: localStorage.getItem("login"),
        transList: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUserTransactions = this.fetchUserTransactions.bind(this);
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
  }

  componentDidMount() {
    this.fetchUserTransactions();
  }

  fetchUserTransactions() {
    let token = localStorage.getItem("login");
    let userId = localStorage.getItem("id");

    if (this.state.isLoggedIn) {
      let data = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
      fetch(`/api/user/${userId}`, data)
        .then(response => {
            return response.json()
        })
        .then(json => {
          let transactions = json.Transactions.map(trans => {
            return(
              <List.Item key={trans.id}>
                {`${trans.ticker} - ${trans.quantity} shares`}
              </List.Item>
            );
          });
          this.setState(() => {
            return { transList: transactions };
          });
        });
    } else {
      this.setState(() => {
        return { isLoggedIn: false };
      });
    }
  }

  render() {
    let { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/signin" />
    }
    
    return (
      <Container>
        <Header size="huge">Portfolio</Header>
        <Grid container columns={2} divided>
            <Grid.Column>
            <List celled size="huge">
              {this.state.transList}
            </List>
            </Grid.Column>
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
