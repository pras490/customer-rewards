import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { ProductList } from './views/ProductList';
import { TransactionList } from './views/TransactionList';

export const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={"/"} exact component={ProductList} />
          <Route path={"/transactionList"} exact component={TransactionList} />
        </Switch>
      </div>
    </Router>
  )
}
