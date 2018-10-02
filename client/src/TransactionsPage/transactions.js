import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

class TransactionsPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container>
        <Header size="huge">Transactions</Header>
      </Container>
    );
  }
}

export default TransactionsPage;
