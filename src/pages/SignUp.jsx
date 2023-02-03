import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import svg from './../assets/join.svg'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { storage, upload } from "../firebase/config";
import { setLoader } from "../store/slices/Loader.slice";
import { setUser } from "../store/slices/User.slice";
import { setAvatarPath } from "../store/slices/Avatar.slice";
export const config={
    headers:{
        "X-Master-Key":"$2b$10$e/Msax.Ti/T5hZLxhqHW9.l1/v/oS0TXDrciORHN0fA/wP4cUyaSm",
        "Content-Type":"application/json"
    }
}
function SignUp() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch=useDispatch()
    const [avatar,setAvatar]=useState()
    const [image, setImage] = useState("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80 870w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80 1170w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80 1470w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80 1740w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80 1770w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80 2070w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80 2340w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80 2370w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80 2670w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80 2940w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80 2970w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80 3270w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80 3540w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80 3570w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80 3870w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4140&q=80 4140w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4170&q=80 4170w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4470&q=80 4470w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4740&q=80 4740w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4770&q=80 4770w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4878&q=80 4878w")
    useEffect(()=>{
        //dispatch(setLoader(true))
    axios.get("https://api.unsplash.com/photos/random?client_id=uTZfqZ1KDkclZVTNer_r-5RF_2-ObxoU6-hRBvq8U7w")
    .then(res=>{
        setImage(res.data.urls.full)
        })
        dispatch(setLoader(false))
    },[])
    async function onSubmit(data){
        dispatch(setLoader(true))
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/",data)
        .then(res=>{
            dispatch(setUser(res.data))
            upload(avatar)
            .then(path=>{
                axios.get("https://api.jsonbin.io/v3/b/63db31e2ebd26539d073338b/",config)
                .then(storeimg=>{
                    const newset=storeimg.data.record
                    newset["u"+res.data.id]=path
                    axios.put("https://api.jsonbin.io/v3/b/63db31e2ebd26539d073338b/",newset,config)
                    .then(res=>{
                        axios.get("https://api.jsonbin.io/v3/b/63db31e2ebd26539d073338b/",config)
                        .then(images=>{
                            dispatch(setAvatarPath(images.data.record["u"+res.data.id]))
                            console.log(images.data.record["u"+res.data.id]);
                        })
                        .finally(
                            setTimeout(() => {
                                dispatch(setLoader(false))
                            }, 500)
                        )
                    })
                })
            })
        })
        
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full h-full flex justify-center items-center relative"
        >
            <img className="w-full h-full object-cover" src={image} alt="" />
            <motion.div className="w-full h-full absolute flex justify-around items-center flex-wrap pb-16 lg:flex-nowrap">
                <h2 className="font-Lobster text-white text-5xl w-2/3 text-center">My Commerce</h2>
                <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="w-3/4 h-5/6  rounded-lg bg-trans backdrop-blur-sm flex justify-center content-around pt-4 flex-wrap lg:mr-8 lg:w-2/5">
                    <h2 className="font-thin  text-3xl text-gray-900 w-full text-center">Register</h2>
                    <label htmlFor="first_name" className="w-full h-auto flex justify-center content-around flex-wrap">
                        <span className="w-3/4 h-auto text-white font-thin text-lg">First Name</span>
                        <motion.input {...register("firstName")} placeholder="Your first name" className="w-3/4 h-auto rounded-md border-none hover:scale-105" type={"text"} id="first_name" />
                    </label>
                    <label htmlFor="last_name" className="w-full h-auto flex justify-center content-around flex-wrap">
                        <span className="w-3/4 h-auto text-white font-thin text-lg">Last Name</span>
                        <motion.input {...register("lastName")} placeholder="Your last name" className="w-3/4 h-auto rounded-md border-none hover:scale-105" type={"text"} id="last_name" />
                    </label>
                    <label htmlFor="email" className="w-full h-auto flex justify-center content-around flex-wrap">
                        <span className="w-3/4 h-auto text-white font-thin text-lg">Email</span>
                        <motion.input {...register("email")} placeholder="Email" className="w-3/4 h-auto rounded-md border-none hover:scale-105" type={"text"} id="email" />
                    </label>
                    <label htmlFor="password" className="w-full h-auto flex justify-center content-around flex-wrap">
                        <span className="w-3/4 h-auto text-white font-thin text-lg">Password</span>
                        <motion.input {...register("password")} placeholder="Pick a password" className="w-3/4 h-auto rounded-md border-none hover:scale-105" type={"text"} id="password" />
                    </label>
                    <label htmlFor="phone" className="w-full h-auto flex justify-center content-around flex-wrap">
                        <span className="w-3/4 h-auto text-white font-thin text-lg">Phone</span>
                        <motion.input {...register("phone")} placeholder="put your number" className="w-3/4 h-auto rounded-md border-none hover:scale-105" type={"text"} id="phone" />
                    </label>
                    <div className="file-select backdrop-blur-sm mx-56" id="src-file1" >
                        <motion.input onChange={(e)=>{
                            setAvatar(e.target.files[0])
                            console.log(e.target.files[0]);
                        }} type="file" name="src-file1" aria-label="Archivo" title="Pick an avatar image"/>
                    </div>
                    <input className="w-1/3 h-auto p-2 text-white rounded-md bg-gray-800 z-50 hover:scale-105 mx-36" type={"submit"} value="Join Us" />
                </motion.form>
            </motion.div>
        </motion.div>
    )
}
export default SignUp