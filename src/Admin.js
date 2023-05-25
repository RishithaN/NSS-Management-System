
import React , { useState } from "react";
import "./Student.css"


const Admin = () => {

    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    const [isAttendance , setIsAttendance] = useState(false);

    const [isMeetView, setIsMeetView] = useState(false);
    const [isGalleryView, setIsGalleryView] = useState(false);


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

          alert(meet_type);
          
          
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
          alert("success")
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

        alert(image)

        
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
        alert("success")
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
      getAllMeetDetails();

      setIsMeetView(true)

  }


    const handleMeetUploadForStudent = async () => {
      //alert("meet");


      setIsMeet(true)
      setIsGallery(false)
      setIsMeetView(false)
      setIsGalleryView(false)
      setIsAttendance(false)

  }

  const handleGalleryViewForStudent = async () => {
    //alert("meet");


    setIsMeet(false)
    setIsGallery(false)
    setIsMeetView(false)
    setIsGalleryView(false)
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
    setIsAttendance(false)

    
}

const handleAttendanceViewForStudent = async () => {

  setIsMeet(false)
    setIsGallery(false)
    setIsMeetView(false)
    setIsGalleryView(false)
    setIsAttendance(true)

    getAttendanceValues();

}

const addStudentAttendance = async (event) => {

  setAttendanceList(out => [...out , event.target.value])

}

const handleGetStudents = async () => {

  fetch('http://localhost:8000/overall-admin/view-students-attendance', {
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

          <h2 onClick={handleMeetUploadForStudent} style={{textAlign:"left", marginLeft:20}}>Upload meet details</h2>
          <br/>
          <h2 onClick={handleGalleryUploadForStudent} style={{textAlign:"left", marginLeft:90}}>Upload gallery</h2>
          <br/>
          <h2 onClick={handleMeetViewForStudent} style={{textAlign:"left", marginLeft:90}}>View meets</h2>
          <br/>
          <h2 onClick={handleGalleryViewForStudent} style={{textAlign:"left", marginLeft:100}}>View Gallery</h2>
          <br/>
          <h2 onClick={handleAttendanceViewForStudent} style={{textAlign:"left", marginLeft:100}}>View Attendance</h2>
          <br/>

          </header>

          {isMeet && (
                    <div>

                          <form onSubmit = {handleMeetSubmit}>

                                          
                                <div>
                                        <label>Meet Type</label>
                                        <br></br>
                                        <input type="radio" id="manual" name="meet_type" value="Manual" onChange={handleType} required/>
                                                <label for="manual">Manual</label><br></br>
                                                <input type="radio" id="classroom" name="meet_type" value="Classroom" onChange={handleType} required/>
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
                                  <label>Year </label>
                                  <input type="number" name="year" required id="year" onChange={handleYear}/>
                                  <br></br>
                                  <p onClick={handleGetStudents}>Get Students</p>
                                </div>

                                <div>

                                    {
                                            studentsArray.map((row) =>
                                            <ul style={{listStyleType: "none"}}>
    

                                                    <input type="checkbox" name="attendance_roll" value={row.id} onChange={addStudentAttendance}/>{row.id}<br></br>

                                                    <br/>

                                            </ul>

                                                
                                            )

                                    }


                                </div>

                                <div>

                                    <input type="submit"/>

                                </div>


                          </form>



                    </div>
                )}

                {isGallery && (

                      <div>

                          <h2>Gallery upload</h2>

                          <br/>
                          <br/>

                          <div>

                            <form onSubmit={handleGallerySubmit}>

                                <input type="file" onChange={handleGalleryPic}/>

                                <br></br>

                                <br/>

                                <br/>

                                <input type="submit"/>

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

                <div>
                    <div>
                        <p>Total Meets Conducted : </p>
                        {totalMeets}
                        
                    </div>

                    <div>
                        <p>
                            Total Manuals Conducted : 
                        </p>
                        {totalManuals}
                    </div>

                    <div>
                        <p>
                            Total Classroom meets Conducted : 
                        </p>
                        {totalClass}
                    </div>

                    <div>
                        <p>
                            Total Attendance : 
                        </p>
                        {totalAttendance}

                    </div>

                    <div>
                        <p>
                            Total Manuals Attendance : 
                        </p>
                        {totalManualsAttendance}

                    </div>

                    <div>
                        <p>
                            Total Classroom meets Attendance : 
                        </p>
                        {totalClassroomAttendance}

                    </div>

                    <div>
                        <p>
                            Attendance Percentage : 
                        </p>
                        {totalPercentage}

                    </div>



                </div>

                )}

      </div>
        
    );
}
 
export default Admin;