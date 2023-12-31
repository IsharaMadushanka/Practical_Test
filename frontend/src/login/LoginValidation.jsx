function LoginValidation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if(values.email === ""){
      errors.email = "Please enter a email address !";
    }
  else if(!email_pattern.test(values.email))  {
      errors.email = "Email is incorrect !";
      }
  else{
    errors.email = "";
  }
  
  if(values.password === ""){
    errors.password = "Password cannot be empty !";
  }
else if(!password_pattern.test(values.password))  {
    errors.password = "Password is incorrect ! "+values.password;
    }
else{
  errors.password = "";
}
return errors;
}
export default LoginValidation