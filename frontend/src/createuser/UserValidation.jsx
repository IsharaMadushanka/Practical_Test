function LoginValidation(values) {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const name_pattern =  /^[a-zA-Z.\s]+$/;
    const mobile_pattern = /^[0-9]{10}$/; 

    if(values.name === ""){
        errors.name = "Please enter a name !"
    }
    else if(!name_pattern.test(values.name))  {
        errors.name = "A name can not have numbers or symbols !";
        }
    else{
      errors.name = "";
    }

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

    if (
      values.cpassword === "" ||
      String(values.cpassword) !== String(values.password)
    ) { 
      errors.cpassword = "Password mismatch";
    } else {
      errors.cpassword = "";
    }

    if (!mobile_pattern.test(values.mobileNum) ) {
      errors.mobile = "Mobile number format is invalid";
    } else if (!mobile_pattern.test(values.homeNum)) {
      errors.mobile = "Home number format is invalid";
    } else {
      errors.mobile = "";
    }

  return errors;
  }
  export default LoginValidation