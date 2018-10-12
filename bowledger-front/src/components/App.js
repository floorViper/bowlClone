import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Home,
  Dashboard,
  Network,
  Blocks,
  Transactions,
  Chaincode,
  p,
  Login,
  GeneralUsers
} from 'components/pages';
import Base from 'components/common/Base';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/caliper" component={p} />
        <Route path="/login" component={Login} />
        <Route path="/users/general" component={GeneralUsers} />
        <Switch>
          <Route path="/explorer/dashboard" component={Dashboard} />
          <Route path="/explorer/network" component={Network} />
          <Route path="/explorer/blocks" component={Blocks} />
          <Route path="/explorer/transactions" component={Transactions} />
          <Route path="/explorer/chaincode" component={Chaincode} />
          <Route path="/explorer" component={Dashboard} />
        </Switch>

        {/*
        <Route path="/page/:page" component={ListPage} />
        <Route path="/tag/:tag/:page?" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route component={NotFoundPage} /> */}
      </Switch>
      <Base />
    </div>
  );
};

export default App;
