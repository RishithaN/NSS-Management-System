
const express = require("express")
const cors = require("cors")
const fs = require("fs")
var path = require("path");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const { client } = require("./DBConnect");

const app = express()

app.use(cookieParser());


//Cookies start


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


var session; //session variable


//Cookies end


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.listen(8000, () => {
    console.log("app listening on port 8000")
})


app.post("/admin/meet-upload" , function(req , res)  {

  console.log("hello")

  const unit_number = session.unit

  console.log(session.unit)

  const type = req.body.mtype
  const title = req.body.mtitle
  const total = req.body.mtotal
  const description = req.body.mdescription




  console.log(type , title , total , description)

  var status = "fail"

  client.query('INSERT INTO meet(unit , mtype , mtitle , mtotal , mdescription) VALUES ($1 , $2 , $3 , $4 , $5)' , [unit_number , type , title , total , description] , (err , result) => {

    if(err){
      throw err;
    }
    else{
      if(result.rowCount === 1){
        status = "success";
        console.log("i am here");
      }

      console.log(status);
      res.send({sending : status})

    }

  })


})



app.post("/admin/gallery-upload" , function(req , res)  {

  const unit_number = session.unit

  console.log(session.unit)

  const image_loc = req.body.image_loc

  var editImageLoc = path.basename(image_loc);

  var text = "/Gallery/Unit" + unit_number + "/" + editImageLoc;

  fs.rename(image_loc, text);

  console.log(text)

  var status = "fail"

  client.query('INSERT INTO gallery_units(unit , image_loc) VALUES ($1 , $2)' , [unit_number , text] , (err , result) => {

    if(err){
      throw err;
    }
    else{
      if(result.rowCount === 1){
        status = "success";
        console.log("i am here");
      }

      console.log(status);
      res.send({sending : status})

    }

  })


})



app.post("/overall-admin/view-meets" , function(req,res) {


  const unit_number = parseInt(req.body.unit);


  client.query('SELECT * from meet where unit = $1' , [unit_number], (err, result) => {
      
      if(err){
          throw err;
      }
      else{

        res.send({sending_rows : result})

  
      }

    })

})

  
app.post("/overall-admin/view-gallery" , function(req,res) {


  const unit_number = parseInt(req.body.unit);


  client.query('SELECT * from gallery_units where unit = $1' , [unit_number], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      res.send({sending_images : result})


    }

  })


})

app.post("/login", function(req, res) {

    const uname = req.body.uname
    const pwd = req.body.pwd

    console.log(uname , pwd)


    var status = "fail"
    var unit_number = 0
    var priority_number = 0

    client.query('SELECT * from login where id = $1 and password = $2' , [uname , pwd], (err, result) => {
        
        if(err){
            throw err;
        }
        else{

          console.log(result)

            if(result.rowCount === 1){
                status = "success";
                console.log("hey heree");
                
                  var row = result.rows[0];
                  unit_number = row.unit
                  priority_number = row.priority

                  session = req.session;
                  session.userid = req.body.uname;
                  session.unit = row.unit
                  session.priority = row.priority
                  console.log(req.session)

            }

            console.log(status);
            res.send({sending : status , unit : unit_number , priority : priority_number})
        }

      })

    
});



app.get("/student/view-gallery", function(req, res) {

  const unit_number = session.unit;


  client.query('SELECT * from gallery_units where unit = $1' , [unit_number], (err, result) => {
      
      if(err){
          throw err;
      }
      else{

        res.send({sending_images : result})

  
      }

    })

  
});



app.get("/student/view-meets", function(req, res) {

  const unit_number = session.unit;


  client.query('SELECT * from meet where unit = $1' , [unit_number], (err, result) => {
      
      if(err){
          throw err;
      }
      else{

        res.send({sending_rows : result})

  
      }

    })

  
});


app.post("/overall-admin/add-student" , function(req,res) {

  const un = parseInt(req.body.uname);
  const gs = parseInt(req.body.gs);
  const unit = parseInt(req.body.un);


  var status = ""
  var p = 0;
  var p1 = 1;


  client.query('SELECT * from login where id = $1' , [un], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      if(result.rowCount === 1){
        status = "exists";
        console.log("hey heree");

      }
      else{
        status = "adding";

          if(gs == 0){
             p = 1;
          }
          else{
            p = 2;

            client.query('UPDATE login SET priority = $1 WHERE unit = $2 and priority = $3' , [p1 , unit , p] , (err , result) =>{
              if(err){
                throw err;
              }
              else{
                status = "removedGSSuccess";

                  client.query('INSERT INTO login(unit , id , password , priority) VALUES ($1 , $2 , $3 , $4)' , [unit , un , un , p], (err, result) => {

                    if(err){
                      throw err;
                    }
                    else{
                      status = "updatesGSSuccess";

                      res.send({sending_status : status})

                    }

                  })


              }
            })

          }

      }


    }

  })


})



app.post("/overall-admin/remove-student" , function(req,res) {

  const un = parseInt(req.body.uname);
  const unit = parseInt(req.body.unit);
  const newGS = parseInt(req.body.newgs);

  var priGS = 2;

  var status = "";

  client.query('SELECT * FROM login WHERE id = $1' , [un] , (err , result) => {
    if(err){
      throw err;
    }
    else{

      if(result.rowCount === 1){

        status = "exists";

        client.query('DELETE FROM login WHERE id = $1' , [un] , (err , result) => {
          if(err){
            throw err;
          }
          else{
            status = "removed";

            if(newGS != 0){
                  client.query('SELECT * FROM login WHERE id = $1' , [newGS], (err, result) => {

                    if(err){
                      throw err;
                    }
                    else{
                      
                      if(result.rowCount === 1){

                            client.query('UPDATE login SET priority = $1 WHERE id = $2' , [priGS , newGS] , (err , result) => {
                              if(err){
                                throw err;
                              }
                              else{
                                status = "updatedNewGS";
                                res.send({sending_status : status})
                              }
                            })

                      }

                      else{
                        client.query('INSERT INTO login VALUES($1 , $2 , $3 , $4', [unit , newGS , newGS , priGS] , (err , result) => {
                          if(err){
                            throw err;
                          }
                          else{
                            status = "addedNewGS";
                            res.send({sending_status : status})

                          }
                        })
                      }

                    }

                  })
            }

          }
        })

      }
      else{
        status = "doesn't exists";
        res.send({sending_status : status})
      }

    }
  })



})


app.post("/overall-admin/view-students" , function(req,res) {


  const unit_number = parseInt(req.body.unit);


  client.query('SELECT * from login where unit = $1' , [unit_number], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      res.send({sending_students : result})


    }

  })


})



  app.get("/", (req, res) => {
    res.send("Hello World!");
  });


