import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { connect } from 'react-redux';

import "./cssFiles/styles.css";
import { Row } from 'reactstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('../assests/restaurants', false, /\.(png|jpe?g|svg)$/));

const Restaurant = props => (
    
    <div className="row p-2">
        <div className="col-md-4"> 
            <Link to ={"/view/"+props.restaurant._id}>          
            <button className="card cardView" style={{backgroundColor: props.restaurant.theme, width: 350, height: 300}}>  
            
                <div className="card-body">
                <img src= {images[`${props.restaurant.name}.png`]} alt="Snow"></img>
                    <h4>{props.restaurant.name}</h4>

                    {props.restaurant.description}
                </div>    
            </button>
            </Link>
        </div>
    </div>
)
class RestaurantsList extends Component{
    constructor(props){
        super(props);

        this.state = { restaurants: []};
    }

    componentDidMount(){
        axios.get('/api/restaurants/')
            .then(response => {
                this.setState({restaurants: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        console.log('to search');

    }
    
    restaurantList(){
        console.log(this.state.restaurants)
        return this.state.restaurants.map(currentrestaurant =>{
            return <Restaurant restaurant={currentrestaurant} key={currentrestaurant._id}/>;
        })
    }
    render(){
        return(
        
        <div className="container p-2">
            <h3>Select your restaurant: </h3>
            <div className="row p-2">
                {this.restaurantList()}
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

export default connect(mapStateToProps, { })(RestaurantsList);