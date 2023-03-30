
import React , { useState } from "react";


const Admin = () => {

    const [isMeet, setIsMeet] = useState(false);
    const [isGallery, setIsGallery] = useState(false);

    const [isMeetView, setIsMeetView] = useState(false);
    const [isGalleryView, setIsGalleryView] = useState(false);


    const [meetArray , updateMeetArray] = useState([]);
    const [images , getImagesLocations] = useState([]);


    const [meet_type, setMeetType] = useState('');
    const [title , setTitle] = useState('');
    const [total , setTotal] = useState('');
    const [description , setDescription] = useState('');


    const [image , setGalleryPic] = useState('');

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

      getAllMeetDetails();

      setIsMeetView(true)

  }


    const handleMeetUploadForStudent = async () => {
      //alert("meet");


      setIsMeet(true)
      setIsGallery(false)
      setIsMeetView(false)
      setIsGalleryView(false)

  }

  const handleGalleryViewForStudent = async () => {
    //alert("meet");


    setIsMeet(false)
    setIsGallery(false)
    setIsMeetView(false)
    setIsGalleryView(false)

    getGalleryImages();

    setIsGalleryView(true);

}


  const handleGalleryUploadForStudent = async () => {
    //alert("meet");


    setIsMeet(false)
    setIsGallery(true)
    setIsMeetView(false)
    setIsGalleryView(false)

    
}



    return (

      <div>

        <div className="studentNav">

          <h2 onClick={handleMeetUploadForStudent} className="navStudent">Upload meet details</h2>
          <br/>
          <h2 onClick={handleGalleryUploadForStudent} className="navStudent">Upload gallery</h2>
          <br/>
          <h2 onClick={handleMeetViewForStudent} className="navStudent">View meets</h2>
          <br/>
          <h2 onClick={handleGalleryViewForStudent} className="navStudent">View Gallery</h2>
          <br/>


          </div>

          {isMeet && (
                    <div>

                          <form onSubmit = {handleMeetSubmit}>

                                          
                                <div>
                                        <label>Meet Type</label>
                                        <br></br>
                                        <input type="radio" id="manual" name="meet_type" value="Manual" onChange={handleType} />
                                                <label for="manual">Manual</label><br></br>
                                                <input type="radio" id="classroom" name="meet_type" value="Classroom" onChange={handleType} />
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

                {isGalleryView && (

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
 
export default Admin;