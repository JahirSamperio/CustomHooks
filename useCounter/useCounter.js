import { useState } from "react"


export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue)

    const increment = (value) => {
        setCounter( counter + value );
    }
    const reset = () => {
        setCounter( initialValue );
    }
    const decrement = (value) => {
        if(counter === 0) return;
        setCounter( counter - value );
    }

    return {
        counter,
        increment,
        reset,
        decrement
    }
}