import React, { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {

    const [state, setState] = useState({data: null, loading: true, error: null});

    //La idea del isMounted es mantener la referencia cuando el hook esta vivo 
    //o cuando el componente qu el usa sigue montado

    //Se utiliza para hacer referencias al DOM pero no el DOM de react
    //Por ejemplos propiedades del DOM
    const isMounted = useRef(true);

    useEffect( () => {

        return () => {
            //El cambio no dispara una renderización al componente
            //solo mantiene la referencia
            isMounted.current = false;
        }
    },[]);


    useEffect(() => {

        setState({ data: null, loading: true, error:null });

        //Petición fetch para obtener los datos de la API
        fetch(url)
            .then( resp => resp.json())
            .then( data => {
                //El setTimeOut es para demorar la petición por 4 seg
                //Y sepueda probar lo de validar el error en caso de que la 
                //petición desmote el componente y luego se hace (ejecuta) el setState
                //setTimeout( () => {
                    if(isMounted.current){

                        setState( {
                            loading: false,
                            error: null,
                            data: data,
                        });
                     }
                    //else {
                    //     console.log('setState no se llamó');
                    // }
                //},4000);

            })
            //En caso dde que la petición HTTP falle, se debe cachar el error
            .catch( () => {
                 setState({
                     data: null,
                     loading: false,
                     error: 'No se  pudo cargar a info'
                 })
            })
    }, [url]);
    
    return state;
};
