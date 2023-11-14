import React, { useState } from 'react';
import LoginValidation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors,setErrors] = useState({});

  const handleInput = (event) =>{
    setValues(prev => ({...prev,[event.target.name] : [event.target.value]}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));
  };
  return (
    <div>
      <div>
        <form action='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' name='password'onChange={handleInput}/>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
}
export default Login;