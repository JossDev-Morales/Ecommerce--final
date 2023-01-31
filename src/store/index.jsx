import { configureStore } from '@reduxjs/toolkit'
import Loader from './slices/Loader.slice'
import Products from './slices/Products.slice'
import User from './slices/User.slice'
import Open from './slices/Open'

export default configureStore({
    reducer: {
        Loader,
        User,
        Products,
        Open
    }
})
