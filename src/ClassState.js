import React from 'react';
import { START, CONFIRM, DELETE } from './App';

export class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: START,
            start_error: false,
            start_loading: false,
            start_verifying: false,
            start_input: "",
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
        if (this.state.start_loading) {
            setTimeout(() => {
                console.log("setTimeout class");
                if (this.state.start_input === this.props.security_code) {
                    this.setState({start_verifying: true, start_loading: false, start_error: false, current: CONFIRM});
                } else {
                    this.setState({start_verifying: true, start_loading: false, start_error: true});
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
        if (this.state.current === START) {
            return (
                <div>
                    <h2>Eliminador ({this.props.name})</h2>
                    <p>Por favor, escribe el código de seguridad.</p>
                    {this.state.start_loading && <p>Cargando...</p>}
                    {!this.state.start_loading && this.state.start_verifying && this.state.start_error && <p>Error: el código es incorrecto</p>}
                    {!this.state.start_loading && this.state.start_verifying && !this.state.start_error && <p>Comprobación exitosa</p>}
                    <input 
                        onChange = {(e) => {
                            this.setState({start_input: e.target.value, start_verifying: false});
                        }}
                        placeholder = "Código de seguridad"
                    />
                    <button
                        onClick = {() => this.setState({start_loading: true})}
                    >Comprobar</button>
                </div>
            );
        } else if (this.state.current === CONFIRM) {
            return (
                <div>
                    <h2>Confirmar</h2>
                    <p>¿Estás seguro?</p>
                    <button
                        onClick = {() => this.setState({current: DELETE})}
                    >Sí</button>
                    <button
                        onClick = {() => this.setState({start_verifying: false, current: START})}
                    >No</button>           
                </div>
            );
        } else if (this.state.current === DELETE) {
            return (
                <div>
                    <h2>Eliminado</h2>
                    <p>¿Restaurar?</p>
                    <button
                        onClick = {() => this.setState({start_verifying: false, current: START})}
                    >Ok</button>          
                </div>
            );
        }    
    }
}