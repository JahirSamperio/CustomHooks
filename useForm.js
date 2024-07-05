import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm); //Recibe el arreglo que se le envie desde el componente del formulario

    const onInputChange = ({target}) => { //recibe el evento
        const {name, value} = target; //Desestructura el evento en el nombre y valor del input
        setFormState({
            ...formState, //mantiene los campos anteriores sin mutar
            [name]: value //Establece el valor de acuerdo al nombre del input
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }
    return {
        ...formState, //Retornas los valores para poder ser desestructurados
        formState,
        onInputChange,
        onResetForm
    }
}
