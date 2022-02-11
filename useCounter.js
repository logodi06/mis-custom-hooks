//Un customHook es una función

import { useState } from 'react';



export const useCounter = ( initialState = 10 ) => {
    const [counter, setCounter] = useState(initialState);

    const increment = ( ) => {
        // Con esta sentencia, en las pruebas si tenemos 100 y  ejecutamos 2 veces el increment(), increment()
        //El resultado será 99, no importa cuantos increment() tengamos, esto porque esto se hace asincrono
        //y debe cambiar siempre que haya una renderización, pero en la pruebas no es esí.
        setCounter( counter + 1);
        // Para que se puede hacer que de 98 se debe utiliar un callback, y así estamos llamando al valor mas actualizado
        //del state.
        //setCounter(counter => counter + 1);
     
    }

    const decrement = ( ) => {
        setCounter( counter - 1);
    }

    const reset = () => {
        setCounter ( initialState );
    }
    
    return {
        counter,
        increment,
        decrement,
        reset
    };
};
