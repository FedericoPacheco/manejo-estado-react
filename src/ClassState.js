import React from 'react';

const SECURITY_CODE = "Training";

export class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            inputValue: "",
            buttonWasPressed: false,
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
                if (this.state.inputValue === SECURITY_CODE) {
                    this.setState({buttonWasPressed: true, loading: false, error: false});
                } else {
                    this.setState({buttonWasPressed: true, loading: false, error: true});
                }
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
                <h2>Verificador ({this.props.name})</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {this.state.loading && <p>Cargando...</p>}
                {!this.state.loading && this.state.buttonWasPressed && this.state.error && <p>Error: el código es incorrecto</p>}
                {!this.state.loading && this.state.buttonWasPressed && !this.state.error && <p>Comprobación exitosa</p>}
                <input
                    onChange = {(e) => this.setState({buttonWasPressed: false, inputValue: e.target.value})}
                    placeholder = "Código de seguridad"
                />
                <button
                    onClick = {() => this.setState({loading: true})}
                >Comprobar</button>
            </div>
        ); 
    }
}