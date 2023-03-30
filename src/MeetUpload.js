import React , { useState } from "react";
import { useNavigate } from "react-router-dom";



const MeetUpload = () => {

    const [meet_type, setMeetType] = useState('');
    const [title , setTitle] = useState('');
    const [total , setTotal] = useState('');
    const [description , setDescription] = useState('');

    const handleType = event => {

        setMeetType(event.target.value);

    };


    const handleTitle = event => {

        setTitle(event.target.value);

    };


    const handleTotal = event => {

        setTotal(event.target.value);

    };


    const handleDescription = event => {

        setDescription(event.target.value);

    };

    const handleSubmit = e  => {

        e.preventDefault();
    
     
            fetch('http://localhost:8000/admin/meet-upload', {
                method: 'POST',
                // redirect: 'manual',
                body: JSON.stringify({mtype : meet_type , mtitle : title , mtotal : total , mdescription : description}),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => {
             
              console.log(data)
              console.log(data.sending)
    
          if(data.sending === "success"){
            alert("success")
          }
          else{
            alert("fail")
          }
              
    
            })

        }


    return (
        <div className="meet">

            <form onSubmit = {handleSubmit}>

                
                <div>
                        <label>Meet Type</label>
                        <br></br>
                        <input type="radio" id="manual" name="meet_type" value="manual" onChange={handleType} />
                        <label for="manual">Manual</label><br></br>
                        <input type="radio" id="classroom" name="meet_type" value="classroom" onChange={handleType} />
                        <label for="classroom">Classroom</label><br></br>

                </div>

                <div>
                  <label>Title </label>
                  <input type="text" name="title" required id="title" onChange={handleTitle}/>
                </div>


                <div>
                    <label>Total students attended </label>
                    <input type="number" name="total" required id = "total" onChange={handleTotal} />
                </div>


                <div>
                  <label>Description </label>
                  <textarea type="text" name="description" required id="description" onChange={handleDescription}/>

                </div>


                <div>

                    <input type="submit"/>

                </div>



            </form>

            

        </div>
    );
}
 
export default MeetUpload;