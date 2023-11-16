import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './login/LoginPage';
import CreateHobby from './pages/Createhobby';
import CreateUser from './createuser/CreateUser';
import Hobby from './pages/Hobby';
import EditHobby from './component/EditHobby';
import AdminHome from './pages/Adminhome';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <div className="App">
     
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/createuser' element={<CreateUser />}> </Route>
        <Route path='/createhobby' element={<CreateHobby />}> </Route>
        <Route path='/edithobby/:id' element={<EditHobby />}></Route>
        <Route path='/hobby' element={<Hobby />}></Route>
        <Route path='/adminhome' element={<AdminHome/>}></Route>
        <Route path='/edituser/:id' element={<EditUser/>}></Route> 
        <Route path='/viewuser/:id' element={<ViewUser/>}></Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
