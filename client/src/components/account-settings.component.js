import React, { Component, useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Col, Row, ListGroup, ListGroupItem,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText} from 'reactstrap';

const HistoryItem = props => (
    <tr>
      <td><img src={props.historyitem.image} alt="Snow"></img></td>
      <td>{props.historyitem.name}</td>
      <td>{props.historyitem.price}</td>
      <td>{props.historyitem.date.substring(0,10)}</td>
    </tr>
  )

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          activeTab: '1',
          name: '',
          email: '',
          password: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          cartli:[],
        };
      }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    

    onSubmit = e => {
        e.preventDefault();

        const id = this.props.auth.user._id;
        const name = (this.state.name == "" ? this.props.auth.user.name : this.state.name);
        const email = (this.state.email == "" ? this.props.auth.user.email : this.state.email);

        const street = (this.state.street == "" ? this.props.auth.user.address.street : this.state.street)
        const city = (this.state.city == "" ? this.props.auth.user.address.city : this.state.city)
        const state = (this.state.state == "" ? this.props.auth.user.address.state : this.state.state)
        const zip = (this.state.zip == "" ? this.props.auth.user.address.zip : this.state.zip)

        const address = {
            street,
            city,
            state,
            zip
        }
        const updatedUser = {
            id,
            name,
            email,
            address
        }

        //Backend api call to update user information
        this.props.updateUser(updatedUser);
        window.location.reload(false);
    };

    toggle = tab => {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
      }

    componentDidMount(){
        axios.get('/api/historyitems/')
              .then(response => {
                  this.setState({
                  cartli: response.data,
                  })   
              })
              .catch(function (error) {
                  console.log(error);
                }) 

        
    }

    cartList(){
        const { isAuthenticated, user } = this.props.auth;   
    
        
        return this.state.cartli.map(currentitem =>{
          return currentitem.userid === user._id ? <HistoryItem historyitem={currentitem} key={currentitem._id}e/> : null;
        })
        
      }


    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
                <Row>
                <Col xs="4">
                    <ListGroup>
                    <ListGroupItem 
                        tag="button" action
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}>
                        Order History
                    </ListGroupItem>
                    <ListGroupItem 
                        tag="button" action
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
                        Account
                    </ListGroupItem>
                    <ListGroupItem 
                        tag="button" action
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}>
                        Address
                    </ListGroupItem>
                    <ListGroupItem 
                        tag="button" action
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}>
                        Preferences
                    </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col xs ="4">
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        { this.state.activeTab == 1 ? 
                        <div>
                        
                        
                       <table className="table">
                         <thead className="thead-light">
                            <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date Ordered</th>
                            </tr>
                        </thead>
                            <tbody>
                            {this.cartList()}
            
                            </tbody> 
                        </table> 
                        
                        </div>



                        
                        : null}
                    </TabPane>
                    <TabPane tabId="2">
                        { this.state.activeTab == 2 ?  
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for='name'>Name</Label>
                                    <Input
                                        type='name'
                                        name='name'
                                        id='name'
                                        placeholder={ user ? `${user.name}` : ''}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    />
                                    <Label for='email'>Email</Label>
                                    <Input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder={ user ? `${user.email}` : ''}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    /> 
                                    {/*TODO: Change password doesn't work yet. Still needs backend implementation*/}
                                    <Label for='password'>Password</Label>
                                    <Input
                                        type='password'
                                        name='password'
                                        id='password'
                                        placeholder='*******'
                                        className='mb-3'
                                        onChange={this.onChange}
                                    />
                                    <Button color='dark' style={{ marginTop: '2rem'}} block>
                                        Apply Changes
                                    </Button>
                                </FormGroup>
                            </Form>
                        : null }
                    </TabPane>
                    <TabPane tabId="3">
                        { this.state.activeTab == 3 ? 
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for='street'>Street</Label>
                                    <Input
                                        type='street'
                                        name='street'
                                        id='street'
                                        placeholder={ user.address.street ? `${user.address.street}` : 'Enter a Street Address'}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    />
                                    <Label for='city'>City</Label>
                                    <Input
                                        type='city'
                                        name='city'
                                        id='city'
                                        placeholder={ user.address.city ? `${user.address.city}` : 'Enter a City'}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    /> 
                                    <Label for='state'>State</Label>
                                    <Input
                                        type='state'
                                        name='state'
                                        id='state'
                                        placeholder={ user.address.state ? `${user.address.state}` : 'Enter a State'}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    />
                                    <Label for='zip'>Zipcode</Label>
                                    <Input
                                        type='zip'
                                        name='zip'
                                        id='zip'
                                        placeholder={ user.address.zip ? `${user.address.zip}` : 'Enter a Zipcode'}
                                        className='mb-3'
                                        onChange={this.onChange}
                                    />
                                    <Button color='dark' style={{ marginTop: '2rem'}} block>
                                        Apply Changes
                                    </Button>
                                </FormGroup>
                            </Form> 
                        : null }
                    </TabPane>
                    <TabPane tabId="4">
                        { this.state.activeTab == 4 ? <h4>Preference tags go here</h4> : null }
                    </TabPane>
                    </TabContent>
                </Col>
                </Row>
          </div>
    );
  }
}   

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {updateUser})(AccountSettings);