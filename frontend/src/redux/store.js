import { configureStore,combineReducers } from "@reduxjs/toolkit";
import productModalSlice from "./product-modal/productModalSlice";
import cartItemsSlice from "./shopping-cart/cartItemSlice";
import authSlice from "./auth/authSlice"
import userSlice from "./users/userSlice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['productModal'] 
  }
const reducer = combineReducers({
    productModal:productModalSlice,
    cartItems:cartItemsSlice,
    auth:authSlice,
    user:userSlice
})
const persistedReducer = persistReducer(persistConfig, reducer)
 const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)
export default store