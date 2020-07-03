import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnError } from './errorActions';


export const addOrder = order => (dispatch, getState) =>{
    axios.post('/api/orders/add', order, tokenConfig(getState))
            .then(res => console.log(res.data));
};

export const deleteOrder = id => (dispatch, getState) =>{
    axios.delete('/api/orders/' + id, tokenConfig(getState))
            .then(res => console.log(res.data));
}