import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/credentials";


export const onAvailableFarms = createAsyncThunk(
    'shoppingSlicer/availableFarms',
    async() => {
        try{
            const locationData = await AsyncStorage.getItem('CurrentLocation');
            let data = JSON.parse(locationData);
            let postCode = Number(data.postCode);
            const response = await axios.get(`${BASE_URL}/shopping/${postCode}`)
            //console.log(response.data);
             return response.data;
        } catch(err){
            return err;
        }
    }
)

export const onAllVendorFoods = createAsyncThunk(
    'shoppingSlicer/allVendorFoods',
    async(name) => {
        try{
            // console.log(name)
            const locationData = await AsyncStorage.getItem('CurrentLocation');
            let data = JSON.parse(locationData);
            let postCode = Number(data.postCode);
            const response = await axios.get(`${BASE_URL}/shopping/top-vendors/${postCode}/foods/${name}`)
            //console.log(`All Vendor Foods: ${response.data}`);
            return response.data;
        } catch(err){
            return err;
        }
    }
)

export const onSearchFoods = createAsyncThunk(
    'shoppingSlicer/onSearchItems',
    async(searchName) => {
        try{
            console.log(`name: ${searchName}`);
            const locationData = await AsyncStorage.getItem('CurrentLocation');
            let data = JSON.parse(locationData);
            let postCode = Number(data.postCode);
            const response = await axios.get(`${BASE_URL}/shopping/search-foods/${postCode}?search=${searchName}`)
            //console.log(`All Vendor Foods: ${response.data}`);
            return response.data;
        } catch(err){
            return err;
        }
    }
)

const initialState = {
    availability: [],
    allVendorFoods: [],
    searchItems: [],
    loading: false,
    error: []
}

const ShoppingSlice = createSlice({
    name: 'shoppingSlice',
    initialState,
    reducers:{
        // onAvailableFarms: async(state, action) => {
        //     state.availability = action.payload
        // }
    },
    extraReducers:{
        [onAvailableFarms.pending]: (state, action) => {
            state.loading = true
        },
        [onAvailableFarms.fulfilled]: (state, action) => {
            state.loading = false
            state.availability = action.payload
            
        },
        [onAvailableFarms.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [onAllVendorFoods.pending]: (state, action) => {
            state.loading = true
        },
        [onAllVendorFoods.fulfilled]: (state, action) => {
            state.loading = false
            state.allVendorFoods = action.payload
            
        },
        [onAllVendorFoods.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [onSearchFoods.pending]: (state, action) => {
            state.loading = true
        },
        [onSearchFoods.fulfilled]: (state, action) => {
            state.loading = false
            state.searchItems = action.payload
            
        },
        [onSearchFoods.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
    
})

// export const { onAvailableFarms } = ShoppingSlice.actions;

export default ShoppingSlice.reducer;