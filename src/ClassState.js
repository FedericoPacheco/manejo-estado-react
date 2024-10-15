import React from 'react';

export class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: true,
            loading: false,
        }
    }

    UNSAFE_componentWillMount() { 
        console.log("componentWillMount");
    }
    
    // Equivalent to useEffect(() => {...}, [])
    componentDidMount() {
        console.log("componentDidMount");
    }

    // Equivalent to useEffect(() => {...}, [dependency])
    // Triggered every time a state change occurs
    componentDidUpdate() {
        console.log("componentDidUpdate start");
        // Avoid infinite loops
        if (this.state.loading) {
            setTimeout(() => {
                console.log("setTimeout class");
                this.setState({loading: false});
            }, 2500);
        }
        console.log("componentDidUpdate finish");
    }

    // Equivalent to useEffect(() => {...; return cleanUpFunc;}, [dependency])
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {this.state.error && <p>Error: el código es incorrecto</p>}
                {this.state.loading && <p>Cargando...</p>}
                <input placeholder = "Código de seguridad"/>
                <button
                    onClick = {() => this.setState({loading: true})}
                >Comprobar</button>
            </div>
        ); 
    }
}