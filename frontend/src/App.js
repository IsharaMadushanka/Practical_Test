import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './login/Login';
import CreateUser from './createuser/CreateUser';

function App() {
  return (
    <div className="App">
     
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/createuser' element={<CreateUser />}> </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
