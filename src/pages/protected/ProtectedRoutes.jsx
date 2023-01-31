import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const allowed = useSelector(state=>state.User)
		// Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que 
		// Importa es que valide si el usuario está loggeado o no
    if(allowed != null){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;