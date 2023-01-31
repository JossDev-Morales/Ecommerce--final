import { useState,useRef, useEffect } from 'react'
import { upload } from './firebase/config'
import { HashRouter, Link, Route, Routes} from 'react-router-dom'
import Products from './pages/products'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import Product from './pages/product'
import ProtectedRoutes from './pages/protected/ProtectedRoutes'
import User from './pages/User'
import Purchases from './pages/Purchases'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/Products.slice'
import Nav from './components/Nav'
import Cart from './components/cart'

function App() {
  const [file, setFile] = useState(null)
  const element=useRef()
  const dispatch=useDispatch()
  const allowed=useSelector(state=>state.User)
  async function upAvatar(e) {
    e.preventDefault()
   try {
    const res = await upload(file)
    setImg(res)
   } catch (error) {
    console.error(error)
   }
  }
  useEffect(()=>{
    dispatch(getProductsThunk())
  },[dispatch])
  return (
    <HashRouter>
        {allowed!= null &&(<Cart/>)}
            <Nav/>
        <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            // Rutas protegidas
            <Route element={<ProtectedRoutes />}>
                <Route path="/purchases" element={<Purchases />}/>
                <Route path="/user" element={<User />} />
            </Route>

        </Routes>
    </HashRouter>
)
}

export default App
