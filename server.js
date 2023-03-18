
const express = require("express")
const cors = require("cors")

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


app.post("/meet-upload" , function(req , res)  {

  const type = req.body.mtype
  const title = req.body.mtitle
  const total = req.body.mtotal
  const description = req.body.mdescription

  console.log(type , title , total , description)

  var status = "fail"

  client.query('INSERT INTO meet VALUES ($1 , $2 , $3 , $4 , $5)' , [id , type , title , total , description] , (err , result) => {

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

                  session=req.session;
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




  app.get("/", (req, res) => {
    res.send("Hello World!");
  });


