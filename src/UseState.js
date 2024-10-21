import React from 'react';
import { START, START_INPUT, START_LOADING, CONFIRM, START_ERROR, DELETE } from './App';

export function UseState({ name, security_code }) {
    const [state, setWholeState] = React.useState({
        current: START,
        start_input: "",
    });
    const setState = (obj) => setWholeState({...state, ...obj});
    
    const onStart = () => {
        setState({
            current: START,
            start_input: "",
        });
    };
    const onInput = (newValue) => {
        setState({
            current: START_INPUT,
            start_input: newValue, 
        });
    };
    const onLoading = () => {
        setState({
            current: START_LOADING,
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onConfirm = () => {
        setState({
            current: CONFIRM,
            start_input: "",
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onError = () => {
        setState({
            current: START_ERROR,
        });
    };
    const onDelete = () => {
        setState({
            current: DELETE,
            start_input: "",
        });
    };

    React.useEffect(() => {
        console.log("useEffect start");
        // Avoid infinite loops
        if (state.current === START_LOADING) {
            setTimeout(() => {
                console.log("setTimeout func");
                if (state.start_input === security_code) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 2500);
        }
        console.log("useEffect end")
    }, [onConfirm, onError, security_code, state]);

    console.log(state);

    if (state.current.includes(START)) {
        return (
            <div>
                <h2>Eliminador ({name})</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.current === START_LOADING && <p>Cargando...</p>}
                {state.current === START_ERROR && <p>Error: el código es incorrecto</p>}
                <input 
                    onChange = {(e) => onInput(e.target.value)}
                    placeholder = "Código de seguridad"
                />
                <button
                    onClick = {onLoading}
                >Comprobar</button>
            </div>
        );
    } else if (state.current.includes(CONFIRM)) {
        return (
            <div>
                <h2>Confirmar</h2>
                <p>¿Estás seguro?</p>
                <button
                    onClick = {onDelete}
                >Sí</button>
                <button
                    onClick = {onStart}
                >No</button>           
            </div>
        );
    } else if (state.current.includes(DELETE)) {
        return (
            <div>
                <h2>Eliminado</h2>
                <p>¿Restaurar?</p>
                <button
                    onClick = {onStart}
                >Ok</button>          
            </div>
        );
    }     
}