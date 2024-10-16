import React from 'react';
import { START, CONFIRM, DELETE } from './App';

export function UseState({ name, security_code }) {
    const [state, setWholeState] = React.useState({
        current: START,
        start_error: false,
        start_loading: false,
        start_verifying: false,
        start_input: "",
    });
    const setState = (obj) => setWholeState({...state, ...obj});
    
    React.useEffect(() => {
        console.log("useEffect start");
        // Avoid infinite loops
        if (state && state.start_loading) {
            setTimeout(() => {
                console.log("setTimeout func");
                if (state.start_input === security_code) {
                    setState({start_verifying: true, start_loading: false, start_error: false, current: CONFIRM});
                } else {
                    setState({start_verifying: true, start_loading: false, start_error: true});
                }
            }, 2500);
        }
        console.log("useEffect end")
    }, [state.start_loading]);

    if (state.current === START) {
        return (
            <div>
                <h2>Eliminador ({name})</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.start_loading && <p>Cargando...</p>}
                {!state.start_loading && state.start_verifying && state.start_error && <p>Error: el código es incorrecto</p>}
                {!state.start_loading && state.start_verifying && !state.start_error && <p>Comprobación exitosa</p>}
                <input 
                    onChange = {(e) => {
                        setState({start_input: e.target.value, start_verifying: false});
                    }}
                    placeholder = "Código de seguridad"
                />
                <button
                    onClick = {() => setState({start_loading: true})}
                >Comprobar</button>
            </div>
        );
    } else if (state.current === CONFIRM) {
        return (
            <div>
                <h2>Confirmar</h2>
                <p>¿Estás seguro?</p>
                <button
                    onClick = {() => setState({current: DELETE})}
                >Sí</button>
                <button
                    onClick = {() => setState({start_verifying: false, current: START})}
                >No</button>           
            </div>
        );
    } else if (state.current === DELETE) {
        return (
            <div>
                <h2>Eliminado</h2>
                <p>¿Restaurar?</p>
                <button
                    onClick = {() => setState({start_verifying: false, current: START})}
                >Ok</button>          
            </div>
        );
    }     
}