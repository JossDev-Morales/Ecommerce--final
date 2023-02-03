import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { configUser } from '../../App';

export const Purchases = createSlice({
    name: 'Purchases',
    initialState: [],
    reducers: {
        setPurchases:(state,action)=>{
            return action.payload
        }
    }
})

export const { setPurchases } = Purchases.actions;

export default Purchases.reducer;
export const getPurchasesThunk = () => (dispatch) => {
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases/",configUser)
        .then(res => dispatch(setPurchases(res.data)))
}