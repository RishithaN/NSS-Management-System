import React , { useState } from "react";
import './OverallAdmin.css';
import './Admin.css'
import './Student.css'

const OverallAdmin = () => {

    const [unit_number, setUnitNumber] = useState(false);
    const [showOptions , setShowOptions] = useState(false);


    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    const [isAddStudent , setIsAddStudent] = useState(false);
    const [isRemoveStudent , setIsRemoveStudent] = useState(false);
    const [isViewStudents , setIsViewStudents] = useState(false);
    
    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);

    const [studentsArray , getStudentList] = useState([]);


    const [username, setUsername] = useState('');
    const [isGS , setGSValue] = useState('');

    const [isNewGS , setNewGSValue] = useState('');

    const [isNewGSShow , setIsNewGSShow] = useState(false);

    const [newGS , setNewGS] = useState('0');


  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };


    const handleUnitNumberChange = event => {

        setUnitNumber(event.target.value)
        setShowOptions(true)
        setIsNewGSShow(false);
        setIsGallery(false)
        setIsMeet(false)
        setIsViewStudents(false)


    }

    const handleGSChange = event => {

        setGSValue(event.target.value);


    }

    const handleNewGSChange = event => {


        setNewGSValue(event.target.value);

        alert(event.target.value);

        if(event.target.value == '0'){
            setIsNewGSShow(false);
        }
        else if(event.target.value == '1'){
            setIsNewGSShow(true);
        }


    }

    const handleChangeNewGSUsername = event => {

        setNewGS(event.target.value)

    }

    const getStudents = async () => {


        fetch('http://localhost:8000/overall-admin/view-students', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({unit : unit_number}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
        

          console.log(data.sending_students.rows)

          getStudentList(data.sending_students.rows)


        })

    }


    const getGalleryImages = async () => {


        fetch('http://localhost:8000/overall-admin/view-gallery', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({unit : unit_number}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
        

          console.log(data.sending_images.rows)

          //var rows = data.sending_rows.rowCount

          getImagesLocations(data.sending_images.rows)


        })

    }


    const getAllMeetDetails = async () => {
        
        fetch('http://localhost:8000/overall-admin/view-meets', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({unit : unit_number}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
        

          console.log(data.sending_rows.rows[0])

          //var rows = data.sending_rows.rowCount

          updateMeetArray(data.sending_rows.rows)


        })


    }


    const handleMeetViewForStudent = async () => {
        //alert("meet");


        setIsMeet(true)
        setIsAddStudent(true)
        setIsGallery(false)
        setIsRemoveStudent(false)
        setIsViewStudents(false)
        setIsNewGSShow(false);
        getAllMeetDetails();
        
        
    }


    const handleGalleryViewForStudent = event => {

        setIsMeet(false)
        setIsAddStudent(false)
        setIsGallery(true)
        setIsRemoveStudent(false)
        setIsViewStudents(false)
        setIsNewGSShow(false);
        getGalleryImages();
        
    }

    const handleAddStudent = event => {

        setIsMeet(false)
        setIsGallery(false)
        setIsAddStudent(true)
        setIsRemoveStudent(false)
        setIsViewStudents(false)
        setIsNewGSShow(false);
        
    }

    const handleRemoveStudent = event => {

        setIsMeet(false)
        setIsGallery(false)
        setIsAddStudent(false)
        setIsRemoveStudent(true)
        setIsNewGSShow(false);
        setIsViewStudents(false)
        
    }

    const handleViewStudents = event => {

        setIsViewStudents(true)
        setIsMeet(false)
        setIsGallery(false)
        setIsAddStudent(false)
        setIsRemoveStudent(false)
        setIsNewGSShow(false);

        getStudents();
        
    }


    const handleUnitSubmit = e => {

        e.preventDefault();

        alert(unit_number);


        fetch('http://localhost:8000/overall-admin/unit-details', {
            method: 'POST',
            body: JSON.stringify({unit : unit_number}),
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

    const handleAddSubmit = e =>{

        e.preventDefault();

        fetch('http://localhost:8000/overall-admin/add-student', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({uname : username , gs : isGS , un : unit_number}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.sending_status);
            alert(data.sending_status);

        })

    }

    const handleRemoveSubmit = e => {

        e.preventDefault();


        fetch('http://localhost:8000/overall-admin/remove-student', {
            method: 'POST',
            // redirect: 'manual',
            body: JSON.stringify({uname : username , newgs : newGS , unit : unit_number}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.sending_status);
            alert(data.sending_status);

        })


    }




    return(


        <div>
            <h1>Overall Admin page</h1>

            <form onSubmit={handleUnitSubmit}>

                    <select onChange={handleUnitNumberChange} className="select-box">

                        <option value="0" default></option>

                        <option value="1" className="select-box__option">Unit 1</option>

                        <option value="2" className="select-box__option">Unit 2</option>

                        <option value="3" className="select-box__option">Unit 3</option>
                        <option value="4" className="select-box__option">Unit 4</option>
                        <option value="5" className="select-box__option">Unit 5</option>
                        <option value="6" className="select-box__option">Unit 6</option>
                        <option value="7" className="select-box__option">Unit 7</option>
                        <option value="8" className="select-box__option">Unit 8</option>
                        <option value="9" className="select-box__option">Unit 9</option>
                        <option value="10" className="select-box__option">Unit 10</option>
                        <option value="11" className="select-box__option">Unit 11</option>
                        <option value="12" className="select-box__option">Unit 12</option>

                    </select>

            </form>


            {showOptions && (

                    <div>

                        <br/>
                        <br/>

                        <h1>Welcome to Overall Admin page</h1>


                        <br/>
                        <br/>

                        <header>

                <h2 onClick={handleMeetViewForStudent} style={{textAlign:"left", marginLeft:100}}>View meet details</h2>
                <h2 onClick={handleGalleryViewForStudent} style={{textAlign:"left", marginRight:100}}>View gallery</h2>
                <h2 onClick={handleAddStudent} style={{textAlign:"left", marginLeft:100}}>Add Student</h2>
                <br/>
                <h2 onClick={handleRemoveStudent} style={{textAlign:"left", marginLeft:100}}>Remove Student</h2>
                <br/>
                <h2 onClick={handleViewStudents} style={{textAlign:"left", marginLeft:100}}>View Students</h2>
                <br/>
                </header>



                {isMeet && (
                    <div>

                            {
                                    meetArray.map((row) =>
                                    <ul style={{listStyleType: "none"}}>
                                            <li><b><u>Title: {row.mtitle}</u></b></li>
                                            <li>Meet/Manual: {row.mtype}</li>
                                            <li>Number of Atendees: {row.mtotal}</li>
                                            <li>Description: {row.mdescription}</li>

                                            <br/>

                                    </ul>

                                        
                                    )

                            }


                        </div>
                    )}

                    {isGallery && (
                        
                        <div className="gallery">
                                {images.map(image => (

                                <img style={{padding: 5, display: 'inline-block'}}
                                    sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    src={process.env.PUBLIC_URL + image.image_loc}
                                    alt="Gallery Images" 
                                    width="600"
                                    height="600"
                                />
                                // <h1>{image.image_loc}</h1>
                                ))}
                            </div>

                    )}


                    {isAddStudent && (
                        <div>

                            {
                                    <form onSubmit={handleAddSubmit} style={{border: "3px solid black", marginLeft:300, marginTop:100, marginRight:300}}>
      
                                    <br/><br/>
                                    <div>
                                      <h2>Add Student</h2><br/>
                                      <label>Username :</label>
                                      <input type="number" name="uname" required id="uname" onChange={handleChangeUsername} style={{margin: 5}}/>
                                    </div><br/>
                                    <div>


                                            <select onChange={handleGSChange} className="select-box">

                                                    <option value="0" default>No</option>

                                                    <option value="1" className="select-box__option">Yes</option>

                                            </select>
                                     
                                    </div><br/>
                            
                                    <div>
                                      <input type="submit" style={{width:150}}/>
                                    </div><br/>
                            
                                    <h1>{username}</h1>
                            
                                  </form>

                            }


                        </div>
                    )}  

                    {isRemoveStudent && (
                        <div>

                            {
                                    <form onSubmit={handleRemoveSubmit} style={{border: "3px solid black", marginLeft:300, marginTop:100, marginRight:300}}>
      
                                    <br/><br/>
                                    <div>
                                      <h2>Remove Student</h2><br/>
                                      <label>Username :</label>
                                      <input type="number" name="uname" required id="uname" onChange={handleChangeUsername} style={{margin: 5}}/>
                                    </div><br/>
                                    <div>


                                            <select onChange={handleNewGSChange} className="select-box">

                                                    <option value="0" className="select-box__option" default>No</option>

                                                    <option value="1" className="select-box__option">Yes</option>

                                            </select>

                                     
                                    </div><br/>

                                    {isNewGSShow && (
                                        <div>

                                            <label>New General Secretary :</label>
                                            <input type="number" name="unameNewGS" required id="unameNewGS" onChange={handleChangeNewGSUsername} style={{margin: 5}}/>
                                            <br></br>
                                        
                                        </div>
                                    )}
                            
                                    <div>
                                      <input type="submit" style={{width:150}}/>
                                    </div><br/>
                            
                                    <h1>{username}</h1>
                            
                                  </form>

                            }


                        </div>
                    )}  


                    {isViewStudents && (
                        <div>

                            {
                                    studentsArray.map((row) =>
                                    <ul style={{listStyleType: "none"}}>
                                            <li><b>{row.id}</b></li>

                                            <br/>

                                    </ul>

                                        
                                    )

                            }


                        </div>
                    )}




                    </div>


            )}




        </div>




    );



}


export default OverallAdmin;