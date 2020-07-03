//import React from 'react';

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addOrder } from '../actions/orderActions';

var total = 0;

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('../assests', false, /\.(png|jpe?g|svg)$/));

const CartItem = props => (
    <tr>
      <td><img src={props.cartitem.image} alt="Snow"></img></td>
      <td>{props.cartitem.name}</td>
      <td>{props.cartitem.price}</td>
      <td>
      <a href="#" onClick={() => {
        
        axios.delete('/api/cartitems/'+ props.cartitem._id)
          .then(response => { console.log(response.data)});

          window.location.reload(false);
        
          }}>Delete</a>
      </td>
      
    </tr>
)

class Cart extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
      }
 

constructor(props) {
    super(props);
        
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            cartli:[],
            id: '',
            totalValue: 0,
            warnUser: '',
        }
}

componentDidMount(){
    axios.get('/api/cartitems/')
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
      if(user.address.street === '' || user.address.city === '' || user.address.state === '' || user.address.zip === ''){  
        this.state.warnUser = ' **Enter or Complete Your Address in your Account Page** ';   
      }
      currentitem.userid === user._id ? this.state.totalValue += currentitem.price : this.state.totalValue += 0;
      return currentitem.userid === user._id ? <CartItem cartitem={currentitem} key={currentitem._id}e/> : null;
    })
    
  }

onSubmit = e =>{
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth; 

    if(user.address.street === '' || user.address.city === '' || user.address.state === '' || user.address.zip === ''){
      
      this.state.warnUser = ' Enter or Complete Your Address in your Account Page ';
      
    }else{
    this.state.cartli.map(currentitem =>{
      console.log(currentitem.userid);

      if(currentitem.userid === user._id){

        const addThis = {
          name: currentitem.name,
          price:  currentitem.price,
          image:  currentitem.image,
          userid: currentitem.userid,
          date: new Date(),
        }
        console.log('trying to add');
        axios.post('/api/historyitems/add', addThis)
            .then(res => console.log(res.data));
        console.log('added');


        console.log('trying to delete');
        axios.delete('/api/cartitems/'+ currentitem._id)
          .then(response => { console.log(response.data)});
      }
    })
    window.location = '/';
  }
}

render(){
    const { isAuthenticated, user } = this.props.auth;
    return(
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>{ user ? `${user.name}` : ''}</label>
            </div>
            <h3>Cart</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                {this.cartList()} 
                
                </tbody> 
            </table> 
            <h3>Total:</h3>
            <p>{this.state.totalValue}</p>
            <label>Ships to: { user ? `**${user.address.street} ${user.address.city},${user.address.state}, ${user.address.zip} **` : ''}</label>
            <p><h2>{this.state.warnUser}</h2></p>
            <div className="form-group">
              <input type="submit" value="Pay Now" className="btn btn-primary" />
            </div>
          </form>
        </div>
            )
}
}
const mapStateToProps = state => ({
    order: state.order,
    auth: state.auth
});

export default connect(mapStateToProps, {addOrder })(Cart);