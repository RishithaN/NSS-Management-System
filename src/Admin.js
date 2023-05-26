
import React , { useState } from "react";
import "./Student.css"


const Admin = () => {

    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    const [isAttendance , setIsAttendance] = useState(false);

    const [isMeetView, setIsMeetView] = useState(false);
    const [isGalleryView, setIsGalleryView] = useState(false);

    const [isMeetStatistics , setIsMeetStatistics] = useState(false);


    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);


    const [meet_type, setMeetType] = useState('');
    const [title , setTitle] = useState('');
    const [total , setTotal] = useState('');
    const [description , setDescription] = useState('');
    const [year , setYear] = useState('');

    const [studentsArray , getStudentList] = useState([]);
    const [attendanceList , setAttendanceList] = useState([]);

    const [image , setGalleryPic] = useState('');


    const [totalMeets ,setTM] = useState();
    const [totalManuals , setTMa] = useState();
    const [totalClass , setTC] = useState();
    const [totalAttendance , setTA] = useState();
    const [totalManualsAttendance , setTMA] = useState();
    const [totalClassroomAttendance , setTCA] = useState();
    const [totalPercentage , setTP] = useState();


    const [manuals , setManualCount] = useState();
    const [classroom , setClassroomCount] = useState();
    const [ratio , setRatio] = useState();


    const handleType = event => {

      setMeetType(event.target.value);

  };

  const getAttendanceValues = async () => {

    fetch('http://localhost:8000/student/view-attendance', {
        method: 'GET',
        // redirect: 'manual',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
    
        setTM(data.totalMeets);
        setTMa(data.totalManuals);
        setTC(data.totalClass);
        setTA(data.totalAttendance);
        setTMA(data.totalManualsAttendance);
        setTCA(data.totalClassroomAttendance);
        setTP(data.totalPercentage);
      
    })

}


  const handleTitle = event => {

      setTitle(event.target.value);

  };


  const handleTotal = event => {

      setTotal(event.target.value);

  };


  const handleYear = async (event) => {
    setYear(event.target.value);

  }


  const handleDescription = event => {

      setDescription(event.target.value);

  };

  const handleGalleryPic = event => {


    // str = event.target.value;


    // s = str.substr(str.lastIndexOf('\\') + 1).split('.')[0];

    // alert(s);

    setGalleryPic(event.target.value);

};


  


  const handleMeetSubmit = e => {

          e.preventDefault();
          
          fetch('http://localhost:8000/admin/meet-upload', {
              method: 'POST',
              body: JSON.stringify({mtype : meet_type , mtitle : title , mtotal : total , mdescription : description , myear : year , attendance : attendanceList}),
              headers: {
                'Content-Type': 'application/json'
              }
          })
          .then((res) => res.json())
          .then((data) => {
          
            console.log(data)
            console.log(data.sending)

        if(data.sending === "success"){
          alert("New Meet Details Successfull added")
          window.location.reload(true);
        }
        else{
          alert("fail")
        }
            

      })


  }


  /*
  gallery and meet view open
  */

  const getGalleryImages = async () => {


    fetch('http://localhost:8000/student/view-gallery', {
        method: 'GET',
        // redirect: 'manual',
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


const getMeetStatistics = async () => {


  fetch('http://localhost:8000/admin/get-statistics', {
      method: 'POST',
      // redirect: 'manual',
      // body: JSON.stringify({unit : unit_number}),
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then((res) => res.json())
  .then((data) => {
  

    setManualCount(data.manuals)
    setClassroomCount(data.classroom)
    setRatio(data.ratio)


  })



}


const getAllMeetDetails = async () => {
    
    fetch('http://localhost:8000/student/view-meets', {
        method: 'GET',
        // redirect: 'manual',
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

  /*
  gallery and meet view  close
  */



  const handleGallerySubmit = e => {


        e.preventDefault();

        fetch('http://localhost:8000/admin/gallery-upload', {
            method: 'POST',
            body: JSON.stringify({image_loc : image}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
        
          console.log(data)
          console.log(data.sending)

      if(data.sending === "success"){
        alert("Image successfully Uploaded")
        window.location.reload(true);
      }
      else{
        alert("fail")
      }
          

    })



  }


  const handleMeetViewForStudent = async () => {

      setIsMeet(false)
      setIsGallery(false)
      setIsMeetView(false)
      setIsGalleryView(false)
      setIsAttendance(false)
      setIsMeetStatistics(false)
      getAllMeetDetails();

      setIsMeetView(true)

  }


    const handleMeetUploadForStudent = async () => {
      //alert("meet");


      setIsMeet(true)
      setIsGallery(false)
      setIsMeetView(false)
      setIsMeetStatistics(false)
      setIsGalleryView(false)
      setIsAttendance(false)

  }

  const handleGalleryViewForStudent = async () => {
    //alert("meet");


    setIsMeet(false)
    setIsGallery(false)
    setIsMeetView(false)
    setIsGalleryView(false)
    setIsMeetStatistics(false)
    setIsAttendance(false)
    getGalleryImages();

    setIsGalleryView(true);

}


  const handleGalleryUploadForStudent = async () => {
    //alert("meet");


    setIsMeet(false)
    setIsGallery(true)
    setIsMeetView(false)
    setIsGalleryView(false)
    setIsMeetStatistics(false)
    setIsAttendance(false)

    
}

const handleAttendanceViewForStudent = async () => {

  setIsMeet(false)
    setIsGallery(false)
    setIsMeetView(false)
    setIsGalleryView(false)
    setIsAttendance(true)
    setIsMeetStatistics(false)

    getAttendanceValues();

}

const handleStatistics = event => {

  setIsGallery(false)
  setIsMeetView(false)
  setIsGalleryView(false)
  setIsAttendance(false)
  setIsMeetStatistics(true)


  getMeetStatistics();

}

const addStudentAttendance = async (event) => {

  setAttendanceList(out => [...out , event.target.value])

}

const handleGetStudents = async () => {

  fetch('http://localhost:8000/admin/view-students-attendance', {
    method: 'POST',
    // redirect: 'manual',
    body: JSON.stringify({myear : year}),
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

    return (

      <div>

        <header className="studentNav">

          <h3 onClick={handleMeetUploadForStudent} style={{textAlign:"left", marginLeft:10}}>Upload meet details</h3>
          <br/>
          <h3 onClick={handleGalleryUploadForStudent} style={{textAlign:"left", marginLeft:70}}>Upload gallery</h3>
          <br/>
          <h3 onClick={handleMeetViewForStudent} style={{textAlign:"left", marginLeft:70}}>View meets</h3>
          <br/>
          <h3 onClick={handleGalleryViewForStudent} style={{textAlign:"left", marginLeft:90}}>View Gallery</h3>
          <br/>
          <h3 onClick={handleAttendanceViewForStudent} style={{textAlign:"left", marginLeft:100}}>View Attendance</h3>
          <br/>
          <h3 onClick={handleStatistics} style={{textAlign:"left", marginLeft:100}}>View Statistics</h3>
          <br />

          </header>

            {isMeet && (
                      <div style={{border: "3px solid black", marginLeft:300, marginTop:100, marginRight:300 , marginBottom:200}}>
                            <br/><h2>Meet upload</h2>

                            <form onSubmit = {handleMeetSubmit} style={{textAlign: 'left', paddingLeft:170}}>
                                  <div>          
                                  <div>
                                  <br/><label>Meet Type:&emsp;&ensp; </label>
                                          
                                          <input type="radio" id="manual" name="meet_type" value="Manual" onChange={handleType} required style={{marginLeft: 5}}/>
                                                  <label for="manual">Manual</label>
                                                  <input type="radio" id="classroom" name="meet_type" value="Classroom" onChange={handleType} required/>
                                                  <label for="classroom">Classroom</label><br></br>

                                  </div>

                                  <div>
                                    <label>Title:&emsp;&emsp;&emsp;&emsp;&ensp; </label>
                                    <input type="text" name="title" required id="title" onChange={handleTitle}  style={{margin: 5}}/>
                                  </div>


                                  <div>
                                      <label>Total Strength: </label>
                                      <input type="number" name="total" required id = "total" onChange={handleTotal}  style={{margin: 5}}/>
                                  </div>


                                  <div>
                                    <label>Description: &ensp;&nbsp;&nbsp;</label>
                                    <textarea type="text" name="description" required id="description" onChange={handleDescription}  style={{margin: 5}}/>

                                  </div>


                                  <div>
                                    <label>Year:&emsp;&emsp;&emsp; &emsp;&nbsp;</label>
                                    <input type="number" name="year" required id="year" onChange={handleYear}  style={{margin: 5}}/>
                                    <br></br></div><br/>
                                    <p onClick={handleGetStudents}>Get Students</p>
                                  </div>

                                  <div>

                                      {
                                              studentsArray.map((row) =>
                                              <ul style={{listStyleType: "none"}}>
      

                                                      <input type="checkbox" name="attendance_roll" value={row.id} onChange={addStudentAttendance}/>{row.id}

                                                      <br/>

                                              </ul>

                                                  
                                              )

                                      }


                                  </div>

                                  <div>

                                    <br/> <input type="submit" style = {{width:150, marginLeft:80}}/><br/><br/>

                                  </div>


                            </form>



                      </div>

            )}

            {isGallery && (

            <div style={{border: "3px solid black", marginLeft:400, marginTop:100, marginRight:400 , marginBottom : 100}}>
            <br/><br/>
                <h2>Gallery upload</h2>

                <br/>
                <br/>

                <div>

                  <form onSubmit={handleGallerySubmit}>

                      <input type="file" onChange={handleGalleryPic}/>

                      <br></br>

                      <br/>

                      <br/>

                      <input type="submit"/><br/><br/><br/>

                  </form>

                </div>


            </div>


            )}

                {isMeetView && (
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

                {isGalleryView && (

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

                {isAttendance && (

                <div  style={{fontSize:18, textAlign:'left'}}>
                    <div><br/><br/>
                        <p style={{marginLeft:400, }}><b>Total Meets Conducted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:</b>&emsp;&emsp;&emsp;{totalMeets}
                        </p> 
                        
                        
                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Total Manuals Conducted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;: </b>&emsp;&emsp;&emsp;{totalManuals}
                        </p>
                      
                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Total Classroom meets Conducted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;  : </b>&emsp;&emsp;&emsp; {totalClass}
                        </p>
                      
                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Total Attendance&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;: </b>&emsp;&emsp;&emsp;{totalAttendance}
                        </p>
                      

                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Total Manuals Attendance &nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;: &emsp;&emsp;&emsp;</b>{totalManualsAttendance}
                        </p>
                      

                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Total Classroom meets Attendance&nbsp;&nbsp;&emsp;&emsp; : &emsp;&emsp;&emsp;</b>{totalClassroomAttendance}
                        </p>


                    </div><br/>

                    <div>
                        <p style={{marginLeft: 400}}><b>
                            Attendance Percentage &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;: </b>&emsp;&emsp;&emsp;{totalPercentage}
                        </p>
                        

                    </div><br/><br/><br/>




                  </div>

                )}

                     


                {isMeetStatistics && (
                        <div style={{textAlign: 'left', marginLeft:350}}>

                            <div>
                              <br/><br/><br/>
                                <p><b>Total Manuals Conducted so far&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:&emsp;&emsp; </b> {manuals}</p>
                              
                            </div>

                            <div>
                                <p><b>Total Classroom meets Conducted so far&emsp;&emsp;:&emsp;&emsp; </b>{classroom}</p>
                                
                            </div>

                            <div>
                                <p><b>Total Ratio&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;: </b>&emsp;&emsp;{ratio}</p>
                                
                            </div>

                            <br></br>
                            <br></br>

                        </div>
                    )}



      </div>
        
    );
}
 
export default Admin;