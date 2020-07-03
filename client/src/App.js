import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import AppNavbar from "./components/AppNavbar"
import HomePage from "./components/home-page.component";
import RestaurantList from "./components/restaurant-list.component.js";
import RestaurantView from "./components/restaurant-view.component";
import CreateOrder from "./components/create-order.component";
import CreateProfile from "./components/create-profile.component";
import Dashboard from "./components/dashboard.component"
import Cart from "./components/cart.component"
import AccountSettings from "./components/account-settings.component"
import Search from "./components/search.component";
import Preferences from "./components/preferences.component";

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className = "container">
            <AppNavbar />
            <br/>
            <Route path="/" exact component={HomePage} />
            <Route path="/view/:id" exact component={RestaurantView} />
            <Route path="/restaurant-list" exact component={RestaurantList} />
            <Route path="/create" exact component={CreateOrder} />
            <Route path="/profile" exact component={CreateProfile} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/account-settings" exact component={AccountSettings} />
            <Route path="/search" component={Search}/>
            <Route path="/preferences" exact component = {Preferences}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;