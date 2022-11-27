import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../utils/credentials";
import axios from 'axios'

export const OnUpdateLocation = createAsyncThunk(
    'userSlicer/updateLocation',
    async(location, thunkAPI) => {
        try{
           const locationString = JSON.stringify(location);
           await AsyncStorage.setItem('CurrentLocation', locationString);
            return location
        } catch(err){
            return err;
        }
    }
)

export const onSignInUser = createAsyncThunk(
    'userSlicer/signinUser',
    async(props) => {
        try{
            const { phone,  password } = props;
            const response = await axios.post(`${BASE_URL}/customer/login`, {
                phone, 
                password
            } )
            console.log(response.data)
            return response.data
           
        } catch(err){
            return err;
        }
    }
)

export const onSignupUser = createAsyncThunk(
    'userSlicer/signupUser',
    async(props) => {
        try{
            const { firstName, lastName, phone,  password } = props;
            const response = await axios.post(`${BASE_URL}/customer/signup`, {
                firstName, 
                lastName,
                phone, 
                password
            } )
            // console.log(response.data)
            return response.data
           
        } catch(err){
            return err;
        }
    }
)

export const onVerifyUser = createAsyncThunk(
    'userSlicer/verifyUser',
    async({OTP, userInfo}) => {
        try{

            //console.log(userInfo.userData)
            
            if (userInfo) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.userData.signature}`;
              }
            // axios.defaults.headers.common['Authorization'] = `Bearer ${userData.signature}`
            const response = await axios.post(`${BASE_URL}/customer/verify`, {
                OTP
            } )
            console.log(response.data)
            return response.data
            
        } catch(err){
            return err;
        }
    }
)

const initialState = {
    userData: {},
    isVerified: false,
    location: {},
    error: undefined,
    isLoading: false
}

const UserSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{

    },
    extraReducers: {
        [OnUpdateLocation.pending] : (state) => {
            state.isLoading = true;
        },
        [OnUpdateLocation.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.location = action.payload;
        },
        [OnUpdateLocation.rejected] : (state) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [onSignInUser.pending] : (state) => {
            state.isLoading = true;
        },
        [onSignInUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        },
        [onSignInUser.rejected] : (state) => {
            state.isLoading = false;
            state.error = action.payload;
           
        },
        [onSignupUser.pending] : (state) => {
            state.isLoading = true;
        },
        [onSignupUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        },
        [onSignupUser.rejected] : (state) => {
            state.isLoading = false;
            state.error = action.payload;
           
        },
        [onVerifyUser.pending] : (state) => {
            state.isLoading = true;
        },
        [onVerifyUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.isVerified = action.payload.verified;
            state.userData = action.payload;
        },
        [onVerifyUser.rejected] : (state) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }, 
})

export default UserSlice.reducer;