import React , { useState } from "react";
import './OverallAdmin.css';
import './Admin.css'

const OverallAdmin = () => {

    const [unit_number, setUnitNumber] = useState(false);
    const [showOptions , setShowOptions] = useState(false);


    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);
    
    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);


    const handleUnitNumberChange = event => {

        setUnitNumber(event.target.value)
        setShowOptions(true)

        setIsGallery(false)
        setIsMeet(false)


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
        setIsGallery(false)


        getAllMeetDetails();
        
    }


    const handleGalleryViewForStudent = event => {

        setIsMeet(false)
        setIsGallery(true)

        getGalleryImages();
        
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

                        <h1>Welcome to Student page</h1>


                        <br/>
                        <br/>

                        <div className="studentNav2">

                <h2 onClick={handleMeetViewForStudent} className="navStudent">View meet details</h2>
                <br/>
                <h2 onClick={handleGalleryViewForStudent} className="navStudent">View gallery</h2>

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


            )}




        </div>




    );



}


export default OverallAdmin;