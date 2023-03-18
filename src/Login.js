import React , { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = e  => {

    e.preventDefault();

    // alert('A form was submitted: ' + message);
 
        fetch('http://localhost:8000/login', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({uname : username , pwd : password}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
         
          console.log(data)
          console.log(data.sending)
          console.log(data.unit)
          console.log(data.priority)

      if(data.sending === "success" && data.unit !== 0 && data.priority === 2){
        navigate('/student')
      }
          

        })

  }

  return (
    <div>
            <form onSubmit={handleSubmit}>


                <div>
                  <label>Username </label>
                  <input type="number" name="uname" required id="uname" onChange={handleChangeUsername}/>
                </div>

                <div>
                  <label>Password </label>
                  <input type="password" name="pass" required id="pwd" onChange={handleChangePassword}/>

                </div>

                <div>
                  <input type="submit" />
                </div>

                <h1>{username}</h1>

              </form>

         </div>
      
  );
};

export default Login;


