import './../loader.css'
function Loader() {
    
    return(

        <div className="w-full h-full absolute flex justify-center items-center top-0 left-0 bg-slate-800 flex-wrap z-50">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1 className='w-full text-center font-thin text-3xl absolute top-2/3 text-white'>Loading</h1>
        </div>
    )
}
export default Loader