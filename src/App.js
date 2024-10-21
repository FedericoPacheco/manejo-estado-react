import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import { ReducerState } from './ReducerState.js';
import './App.css';

/*
Troubleshooting:

Error: ERR_PACKAGE_NOT EXPORTED (...) postcss-safe-parser
Solution: npm install postcss@8.3.0

Error: error:0308010C:digital envelope routines::unsupported
Solution: 
  nvm install 16
  nvm use 16
*/

const SECURITY_CODE_STATE = "Serfe";
const SECURITY_CODE_CLASS = "Training";
const SECURITY_CODE_REDUCER = "2024";

export const START = "start";
export const START_INPUT = "start_input";
export const START_LOADING = "start_loading";
export const START_ERROR = "start_error";
export const CONFIRM = "confirm";
export const DELETE = "delete";

function App() {
  return (
    <div className = "App">
      <UseState 
        name = "UseState"
        security_code = {SECURITY_CODE_STATE}
      />
      <hr></hr>
      <ClassState 
        name = "ClassState"
        security_code = {SECURITY_CODE_CLASS}
      />
      <hr></hr>
      <ReducerState 
        name = "ReducerState"
        security_code = {SECURITY_CODE_REDUCER}
      />
    </div>
    
  );
}

export default App;
