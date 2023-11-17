import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './login/LoginPage';
import CreateHobby from './pages/Createhobby';
import CreateUser from './createuser/CreateUser';
import Hobby from './pages/Hobby';
import EditHobby from './pages/EditHobby';
import AdminHome from './pages/Adminhome';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import Userhome from './user/Userhome';
import EditMe from './user/EditMe';
import AssignHobby from './pages/AssignHobby';
import MyHobbies from './user/MyHobbies';

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
        <Route path='/userhome' element={<Userhome/>}></Route>
        <Route path='/editme' element={<EditMe/>}></Route>
        <Route path='/assign/:id' element={<AssignHobby/>}></Route>
        <Route path='/myhobbies' element={<MyHobbies/>}></Route>
        
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
