import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import "./cssFiles/styles.css";
import {
    Jumbotron, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Row, Col
  } from 'reactstrap';


  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('../assests', false, /\.(png|jpe?g|svg)$/));
var userThis;
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
  
var userThis = "";

class Dashboard extends React.Component {

  constructor(props)
  {
    super(props);

     this.state = {
         menuli:[],
         restaurants: [],
         tag: [],

  }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount = async() =>{
      
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
  }
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

   menuList(){ 
    resList = this.state.restaurants;
    const { isAuthenticated, user } = this.props.auth;
    
    let filteredItems = this.state.menuli.filter(
        (MenuItem) => {
      var temp;
      for (let i = 0; i < user.preferences.length; i++){
        for (let j = 0; j < 4; j++){
          if (MenuItem.tag[j] != null) {

            if( MenuItem.tag[j].indexOf(user.preferences[i]) !== -1)
            {
              
              return temp =  MenuItem.tag[j].indexOf(user.preferences[i]) !== -1;
            }
          }
        }
      }
      //console.log("returning: " + temp);

      return temp;

      }
    )
    return filteredItems.map(currentMenuitem =>{
      return <MenuItem menuitem={currentMenuitem} key={currentMenuitem._id}/>
    })
  }


  render() {
      const { isAuthenticated, user } = this.props.auth;

      return (
        <div>
            <Container>
            <Row>
              <Col>
                <Jumbotron>
                <h2 className="display-3">Hey there, { user ? `${user.name}!` : ''}</h2>
                <p className="lead">We've got all the latest fast food, brunch, lunch, dinner, drinks and more.</p>
                <hr className="my-2" />
                <p>Craving something?</p>
                <p className="lead">
                </p>
                </Jumbotron>
              </Col>
            </Row>
            <h3>We think you'll like or <Link to="/restaurant-list"><Button color="primary">Order Now</Button></Link></h3>

          </Container>
        
          <form onSubmit={this.onSubmit}>
          <table className="table">
            <thead className="thead-light">
              <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Restaurant</th>
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
  auth: state.auth
});

export default connect(mapStateToProps, null)(Dashboard);