import React, { Component, Fragment } from 'react';
import {
   Link,
   Redirect 
  } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

    
    class AppNavbar extends React.Component {

      constructor(props){
        super(props);
        this.state = {
          text:''
        }
      }
      static propTypes = {
        auth: PropTypes.object.isRequired
      }
    
      updateSearch(e) {
        this.setState({text: e.target.value});
      }
    
    
      
      refreshPage(){
        window.location.reload(false);
      }

      onKeyPress(e) {
        if (e.key === "Enter")
        {
          window.location = '/search/' + this.state.text;
          console.log("key pressed");
        }
      }
      render() {
          const { isAuthenticated, user } = this.props.auth;

          const authLinks = (
            <Fragment>
              <NavItem>
                <Link to="/dashboard" className="nav-link">{ user ? `${user.name}'s Dashboard` : ''}</Link>
              </NavItem>
              <NavItem>
                <Link to="/account-settings" className="nav-link">Account</Link>
              </NavItem>
              <NavItem>
                <Link to="/cart" className="nav-link">Cart</Link>
              </NavItem>
              <NavItem>
                <Logout/>
              </NavItem>
            </Fragment>
          );
          const guestLinks = (
            <Fragment>
              <NavItem>
                <RegisterModal/>
              </NavItem>
                <NavItem>
                  <LoginModal/>
              </NavItem>
            </Fragment>
          );
          
          return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Cravings Dash</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              { isAuthenticated ? authLinks : guestLinks}              
            </ul>
            <ul className="navbar-nav ml-auto">
              <input type = "text" size = "30"
                value = {this.state.text}
                onChange = {this.updateSearch.bind(this)}
                onKeyPress = {this.onKeyPress.bind(this)}/>
                <button onClick = {(e) => {this.refreshPage()}}>
                  <Link to = {"/search/" + this.state.text} > Search</Link>
                </button>
              </ul>
            </div>
          </nav>
          )
      }
    }

    const mapStateToProps = state =>({
      auth: state.auth
    });
    export default connect(mapStateToProps, null)(AppNavbar);
  
