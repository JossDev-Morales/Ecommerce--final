import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {setProducts} from './../store/slices/Products.slice'
export default function Prductslyt() {
  const [categorys,setCategorys]=useState()
  const dispatch=useDispatch()
  const [Min,setMin]=useState(0)
  const [Max,setMax]=useState(10000)
  useEffect(() => {
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
    .then(res=>setCategorys(res.data))
  }, [])
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  " mx-10 lg:mx-0 w-1/3 my-5 rounded-md bg-gray-800 h-auto p-2 flex justify-start items-center sm:w-1/3 md:w-1/5 lg:w-4/5"
  const [CategoryOpen,setCategoryOpen]=useState(false)
  const [priceOpen,setPriceOpen]=useState(false)
  const [Category,setCategory]=useState({
    category:{
      open:"cursor-pointer relative lg:flex-wrap mx-6 lg:mx-0 w-1/3 my-5 rounded-md p-2 flex justify-start items-center w-5/6 sm:w-1/5 md:w-1/5 lg:w-4/5 bg-gray-800",
      close:"cursor-pointer relative  mx-6 lg:mx-0 w-1/3 my-5 rounded-md bg-gray-800 p-2 flex justify-start items-center w-5/6 sm:w-1/5 md:w-1/5 lg:w-4/5"
    },
    ul:{
      open:"cursor-auto z-10 absolute top-full left-0 rounded-md my-2 w-full h-64 lg:relative bg-gray-800 flex justify-center content-around flex-wrap",
      close:"hidden"
    }
  })
  
  function price(list,min,max) {
    return list.filter(e=>parseInt(e.price)>=min&&parseInt(e.price)<=max)
  }
  function filter(boolean,id) {
    if (boolean) {
      axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
      .then(res=>{
      dispatch(setProducts(price(res.data,Min,Max)))
      
    })
    }else{
      axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
      .then(res=>{
        dispatch(setProducts(price(res.data,Min,Max)))
      })
    }
  }
  console.log();
  return (
    
  <>
    <div className=" mx-0 shadow-lg bg-slate-50 w-full h-16  lg:w-1/5 lg:h-screen flex items-center  lg:content-start lg:flex-wrap justify-start lg:justify-center text-white">
      <div className={CategoryOpen?Category.category.open:Category.category.close} onClick={()=>{CategoryOpen?setCategoryOpen(false):setCategoryOpen(true)}}>
        <p className=" w-5/6 mx-px lg:m-0">Category</p><FontAwesomeIcon icon={faChevronDown}/>
        <ul className={CategoryOpen?Category.ul.open:Category.ul.close}>
          <li onClick={()=>{filter(false)}} className="cursor-pointer w-11/12 h-auto text-white hover:bg-slate-100 hover:text-gray-900 rounded-md pl-2">All</li>
          {categorys?.map(pos=>(
            <li key={pos.id} onClick={()=>filter(true,pos.id)} className="cursor-pointer w-11/12 h-auto text-white hover:bg-slate-100 hover:text-gray-900 rounded-md pl-2">{pos.name}</li>
          ))}
        </ul>
      </div>
      <div  className={priceOpen?Category.category.open:Category.category.close} >
        <p className=" w-5/6  mx-4 lg:m-0"onClick={()=>{priceOpen?setPriceOpen(false):setPriceOpen(true)}}>Price</p><FontAwesomeIcon icon={faChevronDown} onClick={()=>{priceOpen?setPriceOpen(false):setPriceOpen(true)}}/>
        <ul className={priceOpen?Category.ul.open:Category.ul.close}>
          <input onChange={(e)=>setMin(e.target.value)} value={Min} className="w-4/5 border-none bg-slate-100 mx-4 rounded-md text-slate-900 font-thin" type="number" />
          <span>to</span>
          <input onChange={(e)=>setMax(e.target.value)} value={Max} className="w-4/5 border-none bg-slate-100 mx-4 rounded-md text-slate-900 font-thin" type="number" />
        </ul>
      </div>
    </div>
  </>
  )
}