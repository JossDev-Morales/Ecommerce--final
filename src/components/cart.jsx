import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../store/slices/Open'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { configUser } from '../App'
import { getCartThunk } from '../store/slices/Cart.slice'
import voidimg from './../assets/void.svg'
import { setLoader } from '../store/slices/Loader.slice'
import { getPurchasesThunk } from '../store/slices/Purchases.slice'
function Cart() {
  const navigate=useNavigate()
  const cartlist = useSelector(state => state.CartSlice)
  const total= useSelector(state=>state.TotalSlice)
  const open = useSelector(satate => satate.Open)
  const dispatch = useDispatch()

  function purchaseCart() {
    dispatch(setLoader(true))
    axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases/",{},configUser)
    .then(res=>console.log(res))
    .finally(()=>{
      dispatch(getCartThunk())
      dispatch(getPurchasesThunk())
      dispatch(setLoader(false))
    })
  }
  function addQuantity(q, id) {
    const body = {
      quantity: q + 1
    }
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, body, configUser)
      .then(res => {
        dispatch(getCartThunk())
      })
  }
  function minusQuantity(q, id) {
    const body = {
      quantity: q - 1
    }
    if (body.quantity > 0) {
      axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, body, configUser)
        .then(res => {
          dispatch(getCartThunk())
        })
    }
  }
  function DeleteProduct(id) {
    axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, configUser)
      .then(res => {
        dispatch(getCartThunk())
      })
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { dispatch(setOpen(false)) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md overflow-y-hidden">
                  <div className="flex h-full flex-col overflow-y-hidden bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => { dispatch(setOpen(false)) }}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className={cartlist?.length == 0 ? "w-full h-5/6" : "w-full h-auto"}>
                        <div className="flow-root overflow-hidden w-full h-full">
                          <ul role="list" className="divide-gray-200 w-full h-full">
                            {cartlist?.length == 0 && (
                              <div className="w-full h-full flex justify-center items-center flex-wrap">
                                <img src={voidimg} className="w-4/5 object-contain" />
                                <h3 className='w-full text-center text-xl text-gray-900 font-thin'>Empty</h3>
                              </div>
                            )}
                            {cartlist != null && cartlist.map((product) => (
                              <li key={product.id} className="flex py-6 h-40">
                                <div className="h-24 w-24 flex-shrink-0 flex justify-center items-center overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.images[2].url}
                                    alt={product.product.description}
                                    className="h-5/6 object-contain object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link to={"/product/" + product.productId}>{product.product.title}</Link>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex w-6/12 h-3/4 justify-around items-center">
                                      <p className="text-gray-500">Qty {product.quantity}</p>
                                      <div
                                        onClick={() => {
                                          addQuantity(product.quantity, product.id)
                                        }}
                                        className='svg hover:scale-105 w-1/4 h-auto rounded-md flex justify-center items-center bg-slate-800 p-4'><FontAwesomeIcon icon={faPlus} /></div>
                                      <div
                                        onClick={() => {
                                          minusQuantity(product.quantity, product.id)
                                        }}
                                        className='svg hover:scale-105 w-1/4 h-auto rounded-md flex justify-center items-center bg-slate-600 p-4'><FontAwesomeIcon icon={faMinus} /></div>
                                    </div>



                                    <div className="flex">
                                      <button
                                        onClick={() => { DeleteProduct(product.id) }}
                                        type="button"
                                        className="font-medium text-indigo-400 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p><FontAwesomeIcon icon={faDollarSign}/> {total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                        disabled={cartlist?.length==0}
                          onClick={()=>{
                            purchaseCart()
                            dispatch(setOpen(false))
                            navigate("/purchases")
                          }}
                          className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-500 hover:text-indigo-400"
                            onClick={() => { dispatch(setOpen(false)) }}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Cart