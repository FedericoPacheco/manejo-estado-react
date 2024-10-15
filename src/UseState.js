import React from 'react';

export function UseState({ name }) {
    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("useEffect start");
        // Avoid infinite loops
        if (loading) {
            setTimeout(() => {
                console.log("setTimeout func");
                setLoading(false);
            }, 2500);
        }
        console.log("useEffect end")
    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {error && <p>Error: el código es incorrecto</p>}
            {loading && <p>Cargando...</p>}
            <input placeholder = "Código de seguridad"/>
            <button
                onClick = {() => setLoading(true)}
            >Comprobar</button>
        </div>
    );
}