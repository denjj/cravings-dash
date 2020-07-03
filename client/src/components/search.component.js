import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import { connect } from 'react-redux';


var userThis = "";
var resList = [];
function findRestaurantName(e){
  
  console.log(e);

  for (let i = 0; i < resList.length; i++)
  {
    
    if (e === resList[i]._id)
    {
      console.log('Found');
      console.log('name: ' + resList[i].name)
      return resList[i].name;
    }
  }

}

const MenuItem = props => (
  
    <tr>
      <td><img src={props.menuitem.image} alt="Snow"></img></td>
      <td>{props.menuitem.name}</td>

      <td>{findRestaurantName(props.menuitem.restaurantid)}</td>
      <td>{props.menuitem.price}</td>
      <td>
        <a href="#" onClick={() => {
          const addThis = {
            name: props.menuitem.name,
            price:props.menuitem.price,
            image: props.menuitem.image,
            tag: props.menuitem.tag,
            userid:userThis
        }
        axios.post('/api/cartitems/add', addThis)
            .then(res => console.log(res.data));
        
          }}>Order</a>
      </td>
      
    </tr>
)
 class Search extends Component{

    constructor(props) {

        super(props);
        
        
        this.onSubmit = this.onSubmit.bind(this);

        var str = this.props.location.pathname.slice(8);

        this.state = {
            name: '',
            theme: '',
            description: '', 
            menu:[],
            menuli:[],
            id: '',

            restaurants: [],

            addName: '',
            addPrice: 0,
            addImage: '',
            addUserid: '',

            search: str

        }
    }
    componentDidMount = async() =>{
      
        console.log('clicked');

        await axios.get('/api/menuitems/')
              .then(response => {
                  this.setState({
                  menuli: response.data,
                  })   
              })
              .catch(function (error) {
                  console.log(error);
                }) 
        await axios.get('/api/restaurants/')
              .then(response => {
                 this.setState({
                   restaurants: response.data,
                  })
                })
              .catch(function(error){
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
      resList = this.state.restaurants;
      let filteredItems = this.state.menuli.filter(
          (MenuItem) => {
              return MenuItem.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
      )
      return filteredItems.map(currentMenuitem =>{
        return <MenuItem menuitem={currentMenuitem} key={currentMenuitem._id}/>
      })
      
    }

    
    
    onSubmit(e){
        e.preventDefault();
        window.location = '/';
    }
    render(){
        return(
    <div>
      <form onSubmit={this.onSubmit}>
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

export default connect(mapStateToProps, { })(Search);