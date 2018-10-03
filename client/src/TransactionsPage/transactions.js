import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class TransactionsPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: localStorage.getItem("login"),
      transList: []
    };
    this.fetchUserTransactions = this.fetchUserTransactions.bind(this);
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
                <List.Header>{trans.ticker}</List.Header>
                {`${trans.quantity} shares @ ${trans.price}`}
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

  componentDidMount() {
    this.fetchUserTransactions();
  }

  render() {
    let { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/signin" />
    }
    return (
      <Container>
        <Header size="huge">Transactions</Header>
        <List celled size="massive">
          {this.state.transList}
        </List>
      </Container>
    );
  }
}

export default TransactionsPage;
