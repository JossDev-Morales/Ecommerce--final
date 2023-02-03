import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../pages/SignUp';

export const Avatar = createSlice({
    name: 'Avatar',
    initialState: "",
    reducers: {
        setAvatarPath:(state,action)=>{
            if (action.payload!=undefined) {
                return action.payload
            } else {
                return "not found"
            }
        }
    }
})

export const { setAvatarPath } = Avatar.actions;

export default Avatar.reducer;
