import { createSlice } from '@reduxjs/toolkit';

export const Total = createSlice({
    name: 'Total',
    initialState: 0,
    reducers: {
        setTotal:(state,action)=>{
            return action.payload
        }
    }
})

export const { setTotal } = Total.actions;

export default Total.reducer;
