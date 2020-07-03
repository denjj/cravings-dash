import React, { Component, useState} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

import "./cssFiles/styles.css";
import { Row } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import PropTypes from 'prop-types';
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('../assests/preferences', false, /\.(png|jpe?g|svg)$/));

var Preference;
var preferences = new Array();
class PreferencesList extends Component{
    constructor(props){
        super(props);

        this.state = { 
            tags: [],
        };
       
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
      }

    componentDidMount(){
        axios.get('/api/tags/')
            .then(response => {
                console.log("Check");
                console.log(response);
                this.setState({tags: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        console.log('to search');
        const { isAuthenticated, user } = this.props.auth;

    }

    

 
    
    preferenceList(){
        //console.log(this.state.tags)
        return this.state.tags.map(currentrestaurant =>{
            return <Preference tag={currentrestaurant} key={currentrestaurant._id}/>;
        })
    }
    
    clicked = (e)  => {

        const { isAuthenticated, user } = this.props.auth; 
     
        var index;
        var selected = false;
        for (let i = 0; i < preferences.length; i++)
        {
            if (preferences[i] === e.target.id)
            {
                selected = true;
                index = i;
            }
        }

        console.log(e.target.style);
       
        if (selected){
            e.target.style.opacity = 0.25;
            preferences.splice(index,1);
            console.log(preferences);
        }
        else {

            preferences.push(e.target.id);
            console.log(preferences);

            e.target.style.opacity = 1;

        }

    }

    
    addPreferences = e => {
        console.log("Add Preferences");

        for (let i = 0; i < preferences.length; i++)
        {
            if (preferences[i] === "")
            preferences.splice(i, 1);
        }
        const { isAuthenticated, user } = this.props.auth; 
        console.log(user);
        const newUser = {
            preferences: preferences
        }
        console.log(newUser);
        axios.post(('/api/users/update/') + user._id, newUser)
             .then(res => console.log(res.data));
    }
    
    render(){
        
         Preference = props => (
            <div className="row p-2">
                <div className="col-md-4">        
                    <button className="card cardView" 
                    id = {props.tag._id}
                    onClick = {this.clicked}>  
                    
                        <div className="card-body">
                        <img src= {images[`${props.tag.name}.png`]} style = {{opacity: "0.25"}} id = {props.tag._id} alt="Snow"></img>
                            <h4>{props.tag.name}</h4>
                        </div>    
                    </button>
                </div>
            </div>
            
        )
        
        return(
        
        <div className="container p-2">
            <h3>Select Your Preferences: </h3>
            <div className="row p-2">
                {this.preferenceList()}
            </div>

            <button onClick = {this.addPreferences}>
                 { <Link to = {"/dashboard/"} > Done </Link> }
            </button>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    tag: state.tag,
    auth: state.auth
});

export default connect(mapStateToProps, { })(PreferencesList);