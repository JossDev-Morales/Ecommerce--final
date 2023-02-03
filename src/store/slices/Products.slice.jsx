import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './Loader.slice';

export const Products = createSlice({
    name: 'Products',
    initialState: null,
    reducers: {
        setProducts:(state,action)=>{
            return action.payload
        }
    }
})

export const {setProducts  } = Products.actions;

export default Products.reducer;
export const getProductsThunk = () => (dispatch) => {
    dispatch(setLoader(true))
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => dispatch(setProducts(res.data)))
        .finally(() =>{
            setTimeout(() => {
                dispatch(setLoader(false))
            }, 2250);
        })
}
