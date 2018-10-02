import React, { Component } from 'react';
import SignInPage from "./SignInPage/signIn.js";
import RegisterPage from './RegisterPage/register.js';
import TransactionsPage from './TransactionsPage/transactions.js';
import PortfolioPage from './PortfolioPage/portfolio.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={TransactionsPage} />
          <Route exact path="/portfolio" component={PortfolioPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/register" component={RegisterPage} />
        </div>
      </Router>
    );
  }
}

export default App;
