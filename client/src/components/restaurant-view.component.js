import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import { connect } from 'react-redux';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('../assests/restaurants', false, /\.(png|jpe?g|svg)$/));

var userThis = "";
const MenuItem = props => (
  
    <tr>
      <td><img src={props.menuitem.image} alt="Snow"></img></td>
      <td>{props.menuitem.name}</td>
      <td>{props.menuitem.price}</td>
      <td>
        <a href="#" onClick={() => {
          const addThis = {
            name: props.menuitem.name,
            price:props.menuitem.price,
            image: props.menuitem.image,
            userid:userThis
        }
        axios.post('/api/cartitems/add', addThis)
            .then(res => console.log(res.data));
        
          }}>Order</a>
      </td>
      
    </tr>
)
 class RestaurantView extends Component{

    constructor(props) {

        super(props);
        
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            theme: '',
            description: '', 
            menu:[],
            menuli:[],
            id: '',


            addName: '',
            addPrice: 0,
            addImage: '',
            addUserid: '',

        }
    }
    componentDidMount = async() =>{
      
        await axios.get('/api/restaurants/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                name: response.data.name,
                theme: response.data.theme,
                description: response.data.description,
                menu: response.data.menu,
                id: response.data._id,
                })   
            })
            .catch(function (error) {
                console.log(error);
              }) 
        await axios.get('/api/menuitems/')
              .then(response => {
                  this.setState({
                  menuli: response.data,
                  })   
              })
              .catch(function (error) {
                  console.log(error);
                }) 
        const { isAuthenticated, user } = this.props.auth;
         userThis = user._id;
         console.log(userThis);
    }

    
    deleteAccess(){
      this.setState({
        menuli: this.state.menuli.filter(el => el._id !== this.state.id)
      })
    }
    menuList(){ 
      
      return this.state.menuli.map(currentrestaurant =>{
        return currentrestaurant.restaurantid === this.state.id ? <MenuItem menuitem={currentrestaurant} key={currentrestaurant._id}/> : null;
      })
      
    }

    
    
    onSubmit(e){
        e.preventDefault();
        window.location = '/';
    }
    render(){
        return(
    <div>
      <img src= {images[`${this.state.name}.png`]} alt="Snow"></img>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <h1>{this.state.name}</h1>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
            <h1>{this.state.description}</h1>
        </div>
        <h3>Menu</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
            </tr>
          </thead>
            <tbody>
            {this.menuList()} 
            
            </tbody> 
        </table> 
        <div className="form-group">
          <input type="submit" value="Return To HomePage" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}

const mapStateToProps = state => ({
  menuitem: state.menuitem,
  auth: state.auth,
  addToCart: state.addToCart
});

export default connect(mapStateToProps, { })(RestaurantView);