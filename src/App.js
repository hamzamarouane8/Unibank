import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect, Provider} from 'react-redux'
import Login from './pages/Login';
import Virement from './pages/Virement';
import Comptes from './pages/Comptes';
import Chequier from './pages/Chequier';

import Beneficiaires from './pages/Beneficiaires';

import store from './app/store'
import Layout from './layouts/Default'
import './assets/styles/app.scss';

const mapState2Prosp = (state) => {
  return({session: state.session})}

const LayoutRoute = connect(mapState2Prosp)(({session, exact, path, ...route}) => {
  if (session.authenticated !== true) {
    return <Redirect to={"/login"} />
  }
  return (
    <Route exact={exact} path={path} render={(props) => (
      <Layout>
        <route.component {...props} />
      </Layout>
    )}/>
  )
})

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <LayoutRoute exact path="/" component={Comptes}/>
            <Route path="/login" component={Login}/>
            <LayoutRoute path="/comptes" component={Comptes}/>
            <LayoutRoute path="/virement" component={Virement}/>
            <LayoutRoute path="/beneficiaires" component={Beneficiaires}/>
            <LayoutRoute path="/chequier" component={Chequier}/>

          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
