import React , { useState } from "react";
// import Imgix from "react-imgix";
import './Admin.css';


const Student = () => {

    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    
    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);


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


    const handleMeetViewForStudent = async () => {
        //alert("meet");


        setIsMeet(true)
        setIsGallery(false)


        getAllMeetDetails();
        
    }


    const handleGalleryViewForStudent = event => {

        setIsMeet(false)
        setIsGallery(true)

        getGalleryImages();
        
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
  
                <h1>Welcome to Student page</h1>

                <div className="studentNav2">

                <h2 onClick={handleMeetViewForStudent} className="navStudent">View meet details</h2>
                <br/>
                <h2 onClick={handleGalleryViewForStudent} className="navStudent">View gallery</h2>


                <br/> <br/> 


                </div>



                {isMeet && (
                    <div>

                            {
                                    meetArray.map((row) =>
                                        <ul>
                                                <li>{row.mtitle}</li>
                                                <li>{row.mtype}</li>
                                                <li>{row.mtotal}</li>
                                                <li>{row.mdescription}</li>

                                                <br/>

                                        </ul>

                                        
                                    )

                            }


                    </div>
                )}

                {isGallery && (
                    
                    <div className="gallery">
                            {images.map(image => (

                            <img
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


                

        </div>
      

    );
}
 
export default Student;