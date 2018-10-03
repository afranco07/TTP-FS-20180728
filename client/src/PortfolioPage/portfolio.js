import React, { Component } from 'react';
import { Form, Container, Header, Grid, List, Message } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

class PortfolioPage extends Component {
  constructor() {
    super();
    this.state = {
        ticker: '',
        quantity: '',
        isLoggedIn: localStorage.getItem("login"),
        transList: [],
        balance: '',
        buyFailed: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUserTransactions = this.fetchUserTransactions.bind(this);
    this.buyStock = this.buyStock.bind(this);
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
          let balance = json.balance;
          let transactions = json.Transactions.map(trans => {
            let color = 'grey';
            fetch(`https://api.iextrading.com/1.0/stock/${trans.ticker}/book`).then(response => response.json())
              .then(json => {
                if (json.quote.latestPrice < json.quote.open){
                  color = 'red';
                } else if (json.quote.latestPrice > json.quote.open) {
                  color = 'green';
                } else {
                  color = 'grey';
                }
              })
            return(
              <List.Item key={trans.id} style={{color}}>
                {`${trans.ticker} - ${trans.quantity} shares`}
              </List.Item>
            );
          });
          this.setState(() => {
            return { transList: transactions, balance };
          });
        });
    } else {
      this.setState(() => {
        return { isLoggedIn: false };
      });
    }
  }

  buyStock() {
    let { ticker, quantity, balance } = this.state;
    quantity = +quantity;
    const userid = localStorage.getItem("id");
    const baseURL = `https://api.iextrading.com/1.0/stock/${ticker}/price`;
    fetch(baseURL)
      .then(response => {
        if(response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error with ticker");
        }
      })
      .then(price => {
        if (price > 0 && (price * quantity) < balance) {
          this.setState({buyFailed: false});
          let data = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ ticker, quantity, price, userid })
          };
          fetch('api/transaction', data);
        } else {
          throw new Error("Not enough balance")
        }
      })
      .then(() => this.fetchUserTransactions())
      .catch(error => {
        console.log(error);
        this.setState(() => {
          return { buyFailed: true };
        });
      })
  }

  render() {
    let { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/signin" />
    }
    
    return (
      <Container>
        <Header size="huge">Portfolio</Header>
        <Header><Link to="/">Transactions Page</Link></Header>
        <Header onClick={() => localStorage.clear()}><Link to="/signin">Logout</Link></Header>
        <Grid container columns={2} divided>
            <Grid.Column>
            <List celled size="huge">
              {this.state.transList}
            </List>
            </Grid.Column>
            <Grid.Column onSubmit={this.handleSubmit}>
                <Header size="large">Cash - $ {this.state.balance}</Header>
                <Form onSubmit={this.buyStock}>
                    <Form.Input placeholder="Ticker" name="ticker" value={this.state.ticker} onChange={this.handleInputChange} required />
                    <Form.Input placeholder="Qty" name="quantity" type="number" value={this.state.quantity} onChange={this.handleInputChange} required />
                    <Form.Button>Buy</Form.Button>
                </Form>
                { this.state.buyFailed && <Message content="Error in ticker or balance" /> }
            </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default PortfolioPage;
