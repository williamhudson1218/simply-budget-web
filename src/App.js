import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar';
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import categories from './pages/categories';
import expenses from './pages/expenses';

import axios from 'axios';

const theme = createMuiTheme(themeObject);

// axios.defaults.baseURL =
//   'https://us-west3-simply-budget-functions.cloudfunctions.net/api';

  axios.defaults.baseURL =
  'http://localhost:5000/simply-budget-functions/us-west3/api';

const token = localStorage.FBIdToken;
if (token) {  
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container ">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route exact path="/categories/:budgetId" component={categories} />
                <Route exact path="/expenses/:categoryId" component={expenses} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
