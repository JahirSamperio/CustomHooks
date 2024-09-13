import { onAuthStateChanged } from "firebase/auth"; // Detecta cambios en el estado de autenticación de Firebase.
import { useEffect } from "react"; // Ejecuta efectos secundarios cuando el componente se monta.
import { useDispatch, useSelector } from "react-redux"; // Accede y actualiza el estado global con Redux.
import { FirebaseAuth } from "../firebase/config"; // Configuración de autenticación de Firebase.
import { login, logout } from "../store/auth/authSlice"; // Acciones para manejar el estado de autenticación.
import { startLoadingNotes } from "../store/auth/thunks"; // Acción para cargar las notas del usuario.

export const useCheckAuth = () => { 
    const { status } = useSelector(state => state.auth); // Obtiene el estado de autenticación.
    const dispatch = useDispatch(); // Permite despachar acciones a Redux.

    useEffect(() => { 
        onAuthStateChanged(FirebaseAuth, async(user) => { 
            if (!user) return dispatch(logout()); // Si no hay usuario, cierra sesión.
            
            const { uid, email, displayName, photoURL } = user; // Extrae los datos del usuario autenticado.
            dispatch(login({ uid, email, displayName, photoURL })); // Inicia sesión y actualiza el estado.
            dispatch(startLoadingNotes()); // Carga las notas del usuario.
        });
    }, []);

    return { status }; // Retorna el estado de autenticación.
}
