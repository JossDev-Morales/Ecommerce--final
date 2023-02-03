import taken from './../assets/taken.svg'
function ConfigComponent() {
    return(
        <div className='w-full h-pers flex justify-center content-around flex-wrap'>
            <img className='h-1/3' src={taken} alt="working" />
            <span className="text-center text-4xl w-full text-white font-bold">Working</span>
            <p className='text-slate-300'>I'm on it, coming soon...</p>
        </div>
    )
}
export default ConfigComponent