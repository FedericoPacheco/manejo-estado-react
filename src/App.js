import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import './App.css';

/*
Error: ERR_PACKAGE_NOT EXPORTED (...) postcss-safe-parser
Solución: npm install postcss@8.3.0

Error: error:0308010C:digital envelope routines::unsupported
Solución: 
  nvm install 16
  nvm use 16
*/



function App() {
  return (
    <div className="App">
      <UseState name = "UseState"/>
      <hr></hr>
      <ClassState name = "ClassState"/>
    </div>
  );
}

export default App;
