import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
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

const SECURITY_CODE_FUNC = "Serfe";
const SECURITY_CODE_CLASS = "Training";

export const START = "start";
export const CONFIRM = "confirm";
export const DELETE = "delete";

function App() {
  return (
    <div className = "App">
      <UseState 
        name = "UseState"
        security_code = {SECURITY_CODE_FUNC}
      />
      <hr></hr>
      <ClassState 
        name = "ClassState"
        security_code = {SECURITY_CODE_CLASS}
      />
    </div>
  );
}

export default App;
