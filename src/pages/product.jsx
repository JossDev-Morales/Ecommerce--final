import { faCartShopping, faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { configUser } from "../App"
import { getCartThunk } from "../store/slices/Cart.slice"
import { setLoader } from "../store/slices/Loader.slice"
import { setOpen } from "../store/slices/Open"
import { motion } from "framer-motion"
import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons"
import taken from './../assets/taken.svg'

function Product() {
    const ta = [{
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },]
    const [tag, setTag] = useState([])
    const [product, setProduct] = useState({})
    const [position, setPosition] = useState()
    const params = useParams()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const User = useSelector(state => state.User)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setLoader(true))
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${params.id}/`)
            .then(res => {
                setProduct(res.data)
                setPosition(res.data.images[0].url)
                dispatch(setLoader(false))
                axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${res.data.categoryId}`)
                    .then(res => {
                        setTag(res.data)
                    })
            })


    }, [])
    function adToCart(id, q) {
        const packagePost = {
            "quantity": q,
            "productId": id
        }
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/cart/", packagePost, configUser)
            .then(res => {
                dispatch(getCartThunk())

            })
            .finally(() => {
                dispatch(setOpen(true))
            })
    }
    return (

        <div
            className="gap-6 lg:gap-0 pb-8 lg:pb-0 overflow-scroll w-full h-full bg-slate-200  flex flex-wrap  justify-around items-start pt-8">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="w-4/5 md:w-3/5 h-4/5 flex lg:hidden justify-center content-between flex-wrap">
                <div className="h-3/4 w-full flex justify-center items-center bg-white rounded-xl">
                    <img className="h-4/5 object-contain" src={position} alt="" />
                </div>
                <div className="w-full h-1/6 flex justify-around items-center">
                    {product.images?.map(pos => (
                        (
                            <div
                                key={pos.id}
                                onMouseEnter={() => setPosition(pos.url)}

                                className="w-1/5 h-4/5 bg-white rounded-lg flex justify-center items-center border-4 hover:border-gray-800">
                                <img className="h-full object-contain" src={pos.url} alt="" />
                            </div>
                        )
                    ))}
                </div>
            </motion.div>
            <div className="w-4/5 md:w-3/5 lg:w-3/12 pt-8 h-4/5 rounded-lg bg-slate-100 border border-gray-300 shadow-md flex justify-center content-start flex-wrap">
                <h2 className="w-full m-2 text-center font-thin text-gray-800 text-2xl">{product.title}</h2>
                <span className="w-full text-gray-900 font-semibold text-center">{product.brand}</span>
                <p className="w-9/12 border-t mt-4 border-gray-800">
                    <span className="w-9/12 m-t-4 flex justify-start text-gray-900 font-semibold">{product.category?.name}</span>
                    {product.description}
                </p>

            </div>
            <div
                className="hidden  w-1/3 h-4/5 lg:flex justify-center content-between flex-wrap">
                <div className="h-3/4 w-full flex justify-center items-center bg-white rounded-xl">
                    <img className="h-4/5 object-contain" src={position} alt="" />
                </div>
                <div className="w-full h-1/6 flex justify-around items-center">
                    {product.images?.map(pos => (
                        (
                            <div
                                key={pos.id}
                                onMouseEnter={() => setPosition(pos.url)}

                                className="w-1/5 h-4/5 bg-white rounded-lg flex justify-center items-center border-4 hover:border-gray-800">
                                <img className="h-full object-contain" src={pos.url} alt="" />
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="w-4/5 md:w-3/5 lg:w-3/12 h-full lg:h-4/5 rounded-lg bg-slate-100 border border-gray-300 shadow-md flex justify-center items-start flex-wrap">
                <div className="w-4/5 h-2/4">
                    <div className='w-full h-pers flex justify-center content-around flex-wrap'>
                        <img className='h-1/3' src={taken} alt="working" />
                        <span className="text-center text-4xl w-full text-gray-800 font-bold">Working</span>
                        <p className='text-gray-600'>I'm on it, coming soon...</p>
                    </div>
                </div>
                <span className="w-auto p-2 text-center font-semibold border-b border-gray-800 text-gray-800 text-2xl hover:bg-gray-800 hover:text-slate-50 ">{product.price} <FontAwesomeIcon icon={faDollarSign} /></span>
                <input type="number" className="w-1/5 border-none rounded-md mx-full" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} min={1} />
                <button
                    onClick={() => {
                        if (User != null) {
                            adToCart(params.id, quantity)
                        } else {
                            navigate("/login")
                        }
                    }}
                    className="w-4/5 h-12 rounded-sm flex justify-center items-center font-medium bg-gray-800
                    text-white hover:scale-105 shadow-lg">Add to cart
                </button>

            </div>

            <div className="w-full h-auto flex justify-around content-start flex-wrap pb-12 mt-16">
                {tag?.filter(e => e.id != params.id).map(pos => (
                    <motion.div
                        key={pos.id}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="shadow-sm bg-slate-100 relative w-4/5 md:w-3/5 lg:w-3/12 h-96 rounded-lg my-8 flex justify-center items-start flex-wrap overflow-hidden group "
                    >
                        <button
                            onClick={() => {
                                if (User != null) {
                                    adToCart(pos.id, 1)
                                } else {
                                    navigate("/login")
                                }
                            }}
                            className="z-20 svg flex justify-center items-center w-16 h-16 bg-gray-800 absolute rounded-full -right-full top-4 group-hover:right-4">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                        <Link to={`/product/${pos.id}`} className="w-full h-3/5 group-hover:opacity-75 flex justify-center items-center rounded-xl bg-white">
                            <img className="object-scale-down h-3/5" src={pos.images[0].url} alt="" />
                        </Link>
                        <div className=" w-full h-2/5  px-8 py-2">
                            <h2 className="text-slate-900 font-thin">{pos.title}</h2>
                            <span className="text-gray-700 font-semibold w-full flex justify-start p-4">{pos.brand}</span>
                            <p className="text-gray-800 font-bold"><FontAwesomeIcon icon={faDollarSign} /> {pos.price}</p>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Product
