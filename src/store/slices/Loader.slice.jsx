import { createSlice } from '@reduxjs/toolkit';

export const Loader = createSlice({
    name: 'Loader',
    initialState: true,
    reducers: {
        setLoader:(state,action)=>{
            return action.payload
        }
    }
})

export const { setLoader } = Loader.actions;

export default Loader.reducer;
