import React, { useState } from 'react'



const Contact = () => {

  const [name , setName] = useState('');
  const [message , setMessage] = useState('');
  const [email , setEmail] = useState('');

  const handleName = event => {
    setName(event.target.value)
  }

  const handleMessage = event => {
    setMessage(event.target.value)
  }

  const handleEmail = event => {
    setEmail(event.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()


    fetch('http://localhost:8000/user/query-upload', {
              method: 'POST',
              body: JSON.stringify({qname : name , qemail : email , qmessage : message}),
              headers: {
                'Content-Type': 'application/json'
              }
          })
          .then((res) => res.json())
          .then((data) => {
          
            console.log(data)
            console.log(data.sending)

        if(data.sending === "success"){
          alert("Query sent successfully")
          
        }
        else{
          alert("fail")
        }

        window.location.reload(true);
            

      })

    
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-3">Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" required onChange={handleName}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" required onChange={handleEmail}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" id="message" required onChange={handleMessage}/>
        </div>
        <button className="btn btn-danger" type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Contact