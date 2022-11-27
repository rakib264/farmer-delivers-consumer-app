import { configureStore } from '@reduxjs/toolkit';
import shoppingSlice from './features/shoppingSlice.js';
import cartSlice from './features/cartSlice.js'
import userSlice from './features/userSlice.js';
// import { userSlice, shoppingSlice, cartSlice} from './features';
// import {
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'

  


export const store = configureStore({
    reducer: {
        user: userSlice,
        shopping: shoppingSlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    })
})