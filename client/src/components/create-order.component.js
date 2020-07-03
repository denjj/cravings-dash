import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';

import { addOrder } from '../actions/orderActions';

class CreateOrders extends Component{

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeItems = this.onChangeItems.bind(this);
        this.onChangeShipped = this.onChangeShipped.bind(this);
        this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            items: '',
            shipped: false,
            totalPrice: 0,
            date: new Date(),
            profiles: []
        }
    }

    componentDidMount(){
        axios.get('/api/profiles/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        profiles: response.data.map(profile => profile.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeItems(e){
        this.setState({
            items: e.target.value
        });
    }
    onChangeShipped(e){
        this.setState({
            shipped: e.target.value
        });
    }
    onChangeTotalPrice(e){
        this.setState({
            totalPrice: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit = e =>{
        e.preventDefault();

        const order = {
            username: this.state.username,
            items: this.state.items,
            shipped: this.state.shipped,
            totalPrice: this.state.totalPrice,
            date: this.state.date
        };

        console.log(order);

        this.props.addOrder(order);

        window.location = '/';
    }
    render(){
        return(
    <div>
      <h3>Create New Order</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.profiles.map(function(profile) {
                  return <option 
                    key={profile}
                    value={profile}>{profile}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Items: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.items}
              onChange={this.onChangeItems}
              />
        </div>
        <div className="form-group">
          <label>Shipped: </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.shipped}
              onChange={this.onChangeShipped}
              />
        </div>
        <div className="form-group">
          <label>Total Price: </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.totalPrice}
              onChange={this.onChangeTotalPrice}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Order" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}
const mapStateToProps = state => ({
    order: state.order
});

export default connect(mapStateToProps, { addOrder })(CreateOrders);