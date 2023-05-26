import React , { useState } from "react";
// import Imgix from "react-imgix";
import "./Student.css"


const Student = () => {

    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    const [isAttendance , setIsAttendance] = useState(false);
    
    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);

    const [totalMeets ,setTM] = useState();
    const [totalManuals , setTMa] = useState();
    const [totalClass , setTC] = useState();
    const [totalAttendance , setTA] = useState();
    const [totalManualsAttendance , setTMA] = useState();
    const [totalClassroomAttendance , setTCA] = useState();
    const [totalPercentage , setTP] = useState();


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


    const handleMeetViewForStudent = async () => {
        //alert("meet");


        setIsMeet(true)
        setIsGallery(false)
        setIsAttendance(false)

        getAllMeetDetails();
        
    }


    const handleGalleryViewForStudent = event => {

        setIsMeet(false)
        setIsGallery(true)
        setIsAttendance(false)
        getGalleryImages();
        
    }


    const handleAttendanceViewForStudent = event => {

        setIsMeet(false)
        setIsGallery(false)
        setIsAttendance(true)

        getAttendanceValues();

    }


    //Table start


    // function UserTable({ users }) {
    //     const rows = users.map((user) => (
    //       <tr>
    //         <td>{user.mtitle}</td>
    //         <td>{user.mtype}</td>
    //         <td>{user.mtotal}</td>
    //         <td>{user.mdescription}</td>
    //         <td>
    //         </td>
    //       </tr>
    //     ));


    //     return(
    //         <table>
    //         <thead>
    //         <tr>
    //             <th>Title</th>
    //             <th>Type</th>
    //             <th>Total</th>
    //             <th>Description</th>
    //         </tr>
    //         </thead>
    //         <tbody>{rows}</tbody>
    //     </table>
    //     );


    // }


    //Table stop


    return (

       <div>
  
                <h1 style={{marginTop:30}}>Welcome to Student page</h1><br/><br/>
<header>
                <h2 onClick={handleMeetViewForStudent} style={{textAlign:"left", marginLeft:100 , marginRight:100}}>View meet details</h2>
                <h2 onClick={handleGalleryViewForStudent}style={{textAlign:"right", marginRight:100}}>View gallery</h2>
                <h2 onClick={handleAttendanceViewForStudent}style={{textAlign:"right", marginRight:100}}>View Attendance</h2>
</header>


                {isMeet && (
                    <div><div class="split left">
                    <div class="centered">
<br/>
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

</div></div>
                    </div>
                )}

                {isGallery && (
                    <div class="split right">
                    <div class="centered">
                    <div className="gallery" style={{margin:50}}>
                            {images.map(image => (

                            <img  style={{padding: 5, display: 'inline-block'}}
                                sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
                                src={process.env.PUBLIC_URL + image.image_loc}
                                alt="Gallery Images" 
                                width="600"
                                height="600"
                            />
                            // <h1>{image.image_loc}</h1>
                            ))}
                        </div></div></div>

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
                            Total Classroom meets Conducted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&emsp;  :</b>&emsp;&emsp;&emsp; {totalClass}
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

            

                

        </div>
      

    );
}
 
export default Student;