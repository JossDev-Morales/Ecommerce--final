import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"

function Purchases() {
    const purchases=useSelector(state=>state.PurchasesSlice)
    return (
        <div className="w-full h-pers bg-slate-200 flex justify-center content-start flex-wrap overflow-y-scroll pt-8">
            <h2 className="w-full mb-12 text-center text-4xl font-thin text-gray-800">Your Purchases</h2>
            {purchases.map(pos=>(
                <motion.div
                key={pos.id}
                initial={{opacity:0,scale:0.9}}
                whileInView={{opacity:1,scale:1}}
                className="w-11/12 h-1/6 rounded-lg my-8 bg-slate-100 flex justify-start items-center"
                >
                <div className="w-2/6 h-full rounded-lg bg-white flex justify-center items-center">
                    <img className="h-5/6 object-contain" src={pos.product.images[0].url} alt="pos.product.description" />
                </div>
                <div className="w-full h-full flex justify-around content-around p-2 flex-wrap">
                    <h3 className="w-full text-center font-medium text-gray-900 ">{pos.product.title}</h3>
                    <span className="text-base text-gray-700 font-thin">{pos.product.brand}</span>
                    <span className="text-base text-gray-400 font-thin">{pos.createdAt.split("T")[0].split("-").join("/")}</span>
                    <span className="text-base text-gray-700 font-thin">Qty {pos.quantity}</span>
                    <span className="text-base text-gray-700 font-semibold"><FontAwesomeIcon icon={faDollarSign}/> {pos.product.price}</span>
                </div>
                </motion.div>
            ))}
        </div>
    )
}
export default Purchases