import { createSlice } from '@reduxjs/toolkit';

export const Open = createSlice({
    name: 'Opem',
    initialState: false,
    reducers: {
        setOpen:(state,action)=>{
            return action.payload
        }
    }
})

export const { setOpen } = Open.actions;

export default Open.reducer;
