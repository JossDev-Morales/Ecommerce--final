import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { configUser } from '../../App';
import { setTotal } from './Total.slice';

export const Cart = createSlice({
    name: 'Cart',
    initialState: null,
    reducers: {
        setCartSlice:(state,action)=>{
            return action.payload
        }
    }
})

export const { setCartSlice } = Cart.actions;

export default Cart.reducer;
export const getCartThunk = (switchrel,token) => (dispatch) => {
    const confrel={
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
    }
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/cart",switchrel==true?confrel:configUser)
    .then(res=>{
        dispatch(setCartSlice(res.data))
        dispatch(setTotal(res.data.map(e=>parseInt(e.product.price*e.quantity)).reduce((a, b) => a + b, 0)))
    })
}
