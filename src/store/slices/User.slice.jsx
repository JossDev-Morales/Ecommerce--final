import { createSlice } from '@reduxjs/toolkit';

export const User = createSlice({
    name: 'User',
    initialState: {},
    reducers: {
        setUser:(state,action)=>{
            return action.payload
        }
    }
})

export const { setUser } = User.actions;

export default User.reducer;
