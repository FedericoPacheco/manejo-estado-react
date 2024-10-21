import React from 'react';
import { START, START_INPUT, START_LOADING, CONFIRM, START_ERROR, DELETE } from './App';

const reducer = (state, action) => {
    let newState;
    switch(action.type) {
        case START: 
            newState = {
                ...state,
                current: START,
                start_input: "",
            };
            break;
        case START_INPUT: 
            newState = {
                ...state,
                current: START_INPUT,
                start_input: action.payload,
            };
            break;
        case START_LOADING: 
            newState = {
                ...state,
                current: START_LOADING,
            };
            break;
        case START_ERROR: 
            newState = {
                ...state,
                current: START_ERROR,
            };
            break;
        case CONFIRM: 
            newState = {
                ...state,
                current: CONFIRM,
                start_input: "",
            };
            break;
        case DELETE: 
            newState = {
                ...state,
                current: DELETE,
                start_input: "",
            };
            break;
        default: 
            newState = state;
    }
    return newState;
};

export function ReducerState({ name, security_code }) {
    const [state, dispatch] = React.useReducer(reducer, {
        current: START,
        start_input: "",
    });
    
    React.useEffect(() => {
        console.log("useEffect start");
        // Avoid infinite loops
        if (state.current === START_LOADING) {
            setTimeout(() => {
                console.log("setTimeout func");
                if (state.start_input === security_code) {
                    dispatch({type: CONFIRM});
                } else {
                    dispatch({type: START_ERROR});
                }
            }, 2500);
        }
        console.log("useEffect end")
    }, [security_code, state]);

    if (state.current.includes(START)) {
        return (
            <div>
                <h2>Eliminador ({name})</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.current === START_LOADING && <p>Cargando...</p>}
                {state.current === START_ERROR && <p>Error: el código es incorrecto</p>}
                <input 
                    onChange = {(e) => dispatch({type: START_INPUT, payload: e.target.value})}
                    placeholder = "Código de seguridad"
                />
                <button
                    onClick = {() => dispatch({type: START_LOADING})}
                >Comprobar</button>
            </div>
        );
    } else if (state.current.includes(CONFIRM)) {
        return (
            <div>
                <h2>Confirmar</h2>
                <p>¿Estás seguro?</p>
                <button
                    onClick = {() => dispatch({type: DELETE})}
                >Sí</button>
                <button
                    onClick = {() => dispatch({type: START})}
                >No</button>           
            </div>
        );
    } else if (state.current.includes(DELETE)) {
        return (
            <div>
                <h2>Eliminado</h2>
                <p>¿Restaurar?</p>
                <button
                    onClick = {() => dispatch({type: START})}
                >Ok</button>          
            </div>
        );
    }     
}