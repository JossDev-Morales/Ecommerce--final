import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { setAvatarPath } from "../store/slices/Avatar.slice";
import { setLoader } from "../store/slices/Loader.slice";
import { setUser } from "../store/slices/User.slice";
import { config } from "./SignUp";
import { motion } from "framer-motion";

function LogIn() {
    const [saveToken,setSaveToken]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const views={
        width:window.innerWidth,
        height:window.innerHeight
    }
    const onSubmit = data =>{
        dispatch(setLoader(true))
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login/",data)
       .then(res=>{
        dispatch(setUser(res.data.user))
        axios.get("https://api.jsonbin.io/v3/b/63db31e2ebd26539d073338b/",config)
        .then(images=>{
            dispatch(setAvatarPath(images.data.record["u"+res.data.user.id]))
        })
        .finally(
            setTimeout(() => {
                dispatch(setLoader(false))
            }, 2000)
        )
        navigate("/")
        
        if (saveToken==true) {
          localStorage.setItem("token",res.data.token)  
        } 
       })
    }
    return(
    <div className="flex justify-center flex-wrap items-start w-full h-full bg-slate-200 relative">
        <div className="w-full h-1/4 bg-gray-800">

        </div>
        <div className="h-3/4 w-full flex flex-wrap justify-center items-center pb-20 relative">
            <motion.form 
            drag dragConstraints={{top:-views.height/8, bottom:views.height/3, left:-views.width/2.7, right:views.width/2.7}}
            whileDrag={{ scale: 1.05 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="z-20 w-3/4 h-3/5 md:w-1/2 lg:w-3/12 bg-white rounded-md absolute -top-1/4 flex justify-center items-start p-5 shadow-md flex-wrap">
                <h2 className="font-thin text-xl text-gray-900 mx-8">Log In</h2>
                <label htmlFor="mail" className="w-4/5 mx-4">
                    <h3 className="w-full text-left font-thin text-gray-900 text-lg">Email</h3>
                    <input {...register("email")} className="rounded-md w-full hover:scale-105" type="text" id="mail" placeholder="Your email" />
                </label>
                <label htmlFor="password" className="w-4/5 mx-4">
                    <h3 className="w-full text-left font-thin text-gray-900 text-lg">Password</h3>            
                    <input {...register("password")} className="rounded-md w-full hover:scale-105" type="text" id="password" placeholder="Your password" />
                </label>
                <div className="w-4/5 mx-4 z-50">
                    <p className="text-gray-900 font-thin w-auto">Remember me</p>
                    <input 
                    onChange={()=>{saveToken==false?setSaveToken(true):setSaveToken(false)}} 
                    type="checkbox" className="reset m-2 rounded-sm outline-none checked:bg-black" />
                </div>
                
                <input type={"submit"} className="w-1/3 h-auto p-2 text-white rounded-md bg-gray-800 z-50 hover:scale-105" value={"Go!"}/>
                <span className="text-lg font-bold text-slate-800 w-full text-center">you are not? <Link className="font-thin" to={"/signup"}>Register Now</Link></span>
                
            </motion.form>
            
            
        </div>
    </div>
    )
}
export default LogIn