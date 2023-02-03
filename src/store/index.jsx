import { configureStore } from '@reduxjs/toolkit'
import Loader from './slices/Loader.slice'
import Products from './slices/Products.slice'
import User from './slices/User.slice'
import Open from './slices/Open'
import Avatar  from './slices/Avatar.slice'
import CartSlice from './slices/Cart.slice'
import TotalSlice from './slices/Total.slice'
import PurchasesSlice from './slices/Purchases.slice'
export default configureStore({
    reducer: {
        Loader,
        User,
        Products,
        Open,
        Avatar,
        CartSlice,
        TotalSlice,
        PurchasesSlice
    }
})
