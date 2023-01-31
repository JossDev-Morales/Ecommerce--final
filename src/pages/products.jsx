import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons"
import { faCartShopping, faDollarSign, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setOpen } from "../store/slices/Open"
import Prodductslyt from './../components/productslyt'
import { setProducts } from "../store/slices/Products.slice"
import axios from "axios"


function Products() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const products=useSelector(state=>state.Products)
    const [searchBar,setSearchBar]=useState("")
    function search() {
      axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchBar}`)
      .then(res=>dispatch(setProducts(res.data)))
    }
    return (
    <>
      
      <main className="flex content-start justify-start w-full h-full flex-wrap bg-slate-200">  
        <Prodductslyt/>
        <div className="pb-28 lg:pb-12 relative flex-wrap w-full lg:w-4/5 h-full flex justify-around content-start overflow-scroll pt-6">
          <div className=" w-full h-16 flex  justify-end lg:justify-center items-center relative px-4 overflow-y-hidden mb-8">
            <input onChange={(e)=>setSearchBar(e.target.value)} placeholder="Search products" type="text"  className=" focus:shadow-sm mx-4 h-4/5 rounded-md outline-none border-none w-2/6 lg:w-4/6"/> 
            <button onClick={search} className=" svg bg-gray-800 flex justify-center items-center p-2  rounded-lg w-1/12 h-4/5"><FontAwesomeIcon icon={faSearch}/></button>
          </div>
          {products?.map(pos=>(
            <div key={pos.id} className="shadow-sm bg-slate-100 relative w-11/12 sm:w-2/5 md:w-2/5 h-3/5 rounded-lg my-8 flex justify-center items-start flex-wrap overflow-hidden group ">
              <button onClick={()=>{dispatch(setOpen(true))}} className="z-20 svg flex justify-center items-center w-16 h-16 bg-gray-800 absolute rounded-full -right-full top-4 group-hover:right-4">
                <FontAwesomeIcon icon={faCartShopping}/>
              </button>
              <Link to={`/product/${pos.id}`} className="w-full h-3/5 group-hover:opacity-75 flex justify-center items-center rounded-xl bg-white">
                <img className="object-scale-down h-3/5" src={pos.images[0].url} alt="" />
              </Link>
              <div className=" w-full h-2/5  px-8 py-2">
              <h2 className="text-slate-900 font-thin">{pos.title}</h2> 
              <span className="text-gray-700 font-semibold w-full flex justify-start p-4">{pos.brand}</span>
              <p className="text-gray-900 font-bold">{pos.price} <FontAwesomeIcon icon={faDollarSign}/></p>
              <div className="svg absolute flex justify-center items-center w-1/12 h-auto p-4 bg-gray-800 rounded-full bottom-4 right-6 md:right-8 lg:right-10"><FontAwesomeIcon icon={faStar}/></div>
              <div className="svg absolute flex justify-center items-center w-1/12 h-auto p-4 bg-gray-800 rounded-full bottom-4 right-1/4"><FontAwesomeIcon icon={faBookmark}/></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
    )
}
export default Products