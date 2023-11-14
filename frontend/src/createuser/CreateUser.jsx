import React,{useState} from 'react'
import UserValidation from './UserValidation';

function CreateUser() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        name:''
      });
      const [errors,setErrors] = useState({});
    
      const handleInput = (event) =>{
        setValues(prev => ({...prev,[event.target.name] : [event.target.value]}))
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(UserValidation(values));
      };
  return (
    <div>
        
        <div>
            <form action='' onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter new user's name " name='name' onChange={handleInput}/>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div >
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter Email' name='email' onChange={handleInput}/>
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={handleInput}/>
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <button type='submit'>Create User</button>
            </form>
        </div>

    </div>
  )
}

export default CreateUser