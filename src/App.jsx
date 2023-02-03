import { useState, useRef, useEffect } from 'react'
import { upload } from './firebase/config'
import { HashRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Products from './pages/products'
import LogIn from './pages/Login'
import SignUp, { config } from './pages/SignUp'
import Product from './pages/product'
import ProtectedRoutes from './pages/protected/ProtectedRoutes'
import User from './pages/User'
import Purchases from './pages/Purchases'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/Products.slice'
import Nav from './components/Nav'
import Cart from './components/cart'
import Loader from './components/Loader'
import axios from 'axios'
import { setUser } from './store/slices/User.slice'
import { setLoader } from './store/slices/Loader.slice'
import { setAvatarPath } from './store/slices/Avatar.slice'
import { getCartThunk } from './store/slices/Cart.slice'
import { getPurchasesThunk } from './store/slices/Purchases.slice'
import Redirect from './pages/protected/Redirect'
import ConfigComponent from './pages/Config'

export let configUser = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
}
function App() {
  const [file, setFile] = useState(null)
  const element = useRef()
  const dispatch = useDispatch()
  const allowed = useSelector(state => state.User)
  const loader = useSelector(state => state.Loader)

  async function upAvatar(e) {
    e.preventDefault()
    try {
      const res = await upload(file)
      setImg(res)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])
  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getCartThunk())
  }, [dispatch])
  useEffect(() => {
    if (localStorage.getItem("token") != "") {
      dispatch(setUser({}))
      axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/users/me', configUser)
        .then(res => {
          dispatch(setUser(res.data))
          axios.get("https://api.jsonbin.io/v3/b/63db31e2ebd26539d073338b/", config)
            .then(images => {
              dispatch(setAvatarPath(images.data.record["u" + res.data.id]))
            })

        })

    }
  }, [])
  return (
    <HashRouter>
      {allowed != null && (<Cart />)}
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<Redirect/>}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
            // Rutas protegidas
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/user" element={<User />} />
          <Route path='/config' element={<ConfigComponent/>}/>
        </Route>

      </Routes>
      {loader == true && <Loader />}
    </HashRouter>
  )
}

export default App
