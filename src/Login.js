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

      if(data.sending === "success" && data.unit !== 0 && data.priority === 1){
        navigate('/student')
      }

      else if(data.sending === "success" && data.unit != 0 && data.priority == 2){
        navigate('/admin')
      }

      else if(data.sending === "success" && data.unit == 0 && data.priority === 3){
        navigate('/overall-admin')
      }
          

        })

  }

  return (
    <div>
    <form onSubmit={handleSubmit} style={{border: "3px solid black", marginLeft:300, marginTop:100, marginRight:300}}>
      
        <br/><br/>
        <div>
          <h2>Login</h2><br/>
          <label>Username :</label>
          <input type="number" name="uname" required id="uname" onChange={handleChangeUsername} style={{margin: 5}}/>
        </div><br/>

        <div>
          <label>Password : </label>
          <input type="password" name="pass" required id="pwd" onChange={handleChangePassword} style={{margin: 5}}/>

        </div><br/>

        <div>
          <input type="submit" style={{width:150}}/>
        </div><br/>

        <h1>{username}</h1>

      </form>

 </div>
      
  );
};

export default Login;


