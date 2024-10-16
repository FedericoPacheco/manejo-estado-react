import React from 'react';

const SECURITY_CODE = "Serfe";

export function UseState({ name }) {
    const [state, setWholeState] = React.useState({
        error: false,
        loading: false,
        inputValue: "",
        buttonWasPressed: false,
    });
    const setState = (obj) => setWholeState({...state, ...obj});
    
    React.useEffect(() => {
        console.log("useEffect start");
        // Avoid infinite loops
        if (state.loading) {
            setTimeout(() => {
                console.log("setTimeout func");
                if (state.inputValue === SECURITY_CODE) {
                    setState({buttonWasPressed: true, loading: false, error: false});
                } else {
                    setState({buttonWasPressed: true, loading: false, error: true});
                }
            }, 2500);
        }
        console.log("useEffect end")
    }, [state.loading]);

    return (
        <div>
            <h2>Verificador ({name})</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {state.loading && <p>Cargando...</p>}
            {!state.loading && state.buttonWasPressed && state.error && <p>Error: el código es incorrecto</p>}
            {!state.loading && state.buttonWasPressed && !state.error && <p>Comprobación exitosa</p>}
            <input 
                onChange = {(e) => {
                    setState({inputValue: e.target.value, buttonWasPressed: false});
                }}
                placeholder = "Código de seguridad"
            />
            <button
                onClick = {() => setState({loading: true})}
            >Comprobar</button>
        </div>
    );
}