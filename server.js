
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
  const year = req.body.myear

  const list = req.body.attendance

  console.log(type , title , total , description)

  var status = "fail"
  var dupId = 0;

  client.query('INSERT INTO meet(unit , mtype , mtitle , mtotal , mdescription , myear) VALUES ($1 , $2 , $3 , $4 , $5 , $6)' , [unit_number , type , title , total , description , year] , (err , result) => {

    if(err){
      throw err;
    }
    else{
      if(result.rowCount === 1){
        status = "success";

        var keys = Object.keys(list);

        for (var i = 0; i < keys.length; i++) {
      
            dupId = parseInt(list[keys[i]])

          if(type === "Classroom"){
            console.log(dupId)
            client.query('UPDATE attendance SET classroom_no = classroom_no + 1 WHERE id = $1' , [dupId] , (err , result) => {
              if(err){
                throw err;
              }
              else{
                status = "success2";
              }
            })
          }

          else{

              client.query('UPDATE attendance SET manual_no = manual_no + 1 WHERE id = $1' , [dupId] , (err , result) => {
                if(err){
                  throw err;
                }
                else{
                  status = "success3";
                }
              })

          }

        }


        console.log("i am here");
      }

      console.log(status);
      res.send({sending : status})

    }

  })


})



app.post("/admin/gallery-upload" , async(req , res) => {

  const unit_number = session.unit
  

  console.log(session.unit)

  var image_loc = req.body.image_loc

  var editImageLoc = path.basename(image_loc);

  var text = "/Gallery/Unit" + unit_number + "/" + editImageLoc;

  image_loc = "C:/Users/nrish/Downloads/" + editImageLoc;

  console.log(image_loc);

  dest = "C:/Users/nrish/Rishi/Projects/SRP/nss/public/Gallery/Unit" + unit_number + "/" + editImageLoc;

  fs.copyFile(image_loc, dest , function (err) {
    if (err) throw err
    console.log('Successfully renamed - AKA moved!')
  })

  

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
        res.send({sending_status : status})

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

                      client.query('INSERT INTO attendance VALUES($1 , $2 , $3 , $4)' , [unit , un , 0 , 0] , (err , result) => {
                        if(err){
                          throw err;
                        }
                        else{
                          status = "addedsuccess";
                          res.send({sending_status : status})
                        }
                      })

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

        client.query('DELETE FROM attendance WHERE id = $1' , [un] , (err , result) => {

          if(err){
            throw err;
          }
          else{
            client.query('DELETE FROM login WHERE id = $1' , [un] , (err , result) => {
              if(err){
                throw err;
              }
              else{
    
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
                else{
                  status = "removed";
                  res.send({sending_status : status})
                }
    
              }
            })

          }
              
        })


      }
      else{
        status = "doesn't exists";
        res.send({sending_status : status})
      }

    }
  })



});

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


});

app.post("/admin/view-students-attendance" , function(req,res) {


  const unit_number = session.unit;
  const year = req.body.myear;


  client.query('SELECT * from login where unit = $1 and CAST(id AS TEXT) like $2' , [unit_number , year + '%'], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      res.send({sending_students : result})


    }

  })


});


app.post("/overall-admin/get-statistics" , function(req,res) {


  const unit_number = req.body.unit;

  var man = 0;
  var cls = 0;
  var tot = 0;

  var send1 = 0;
  var send2 = 0;
  var send3 = 0;


  client.query('SELECT COUNT(*) from meet GROUP BY mtype , unit HAVING unit = $1' , [unit_number], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      if(result.rowCount == 2){

        var row1 = result.rows[0];
        var row2 = result.rows[1];

        
        man = parseInt(row2.count);
        cls = parseInt(row1.count);

        tot = man  + cls

        send1 = (man);
        send2 = (cls);

        send3 = (man/cls)*100;

      }

      res.send({manuals : man , classroom : cls , ratio : send3})

    }

  })


});


app.post("/admin/get-statistics" , function(req,res) {


  const unit_number = parseInt(session.unit);

  var man = 0;
  var cls = 0;
  var tot = 0;

  var send1 = 0;
  var send2 = 0;
  var send3 = 0;


  client.query('SELECT COUNT(*) from meet GROUP BY mtype , unit HAVING unit = $1' , [unit_number], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      var row1 = result.rows[0];
      var row2 = result.rows[1];

      
      man = parseInt(row2.count);
      cls = parseInt(row1.count);

      tot = man  + cls


      send3 = (man/cls)*100;

      res.send({manuals : man , classroom : cls , ratio : send3})

    }

  })


});


app.get("/student/view-attendance" , function(req,res) {


  const id = session.userid;
  const unit = session.unit;

  const strId = id.toString();

  var manuals = 0;
  var classroom = 0;

  var totalA = 0;
  var total = 0;
  var totalM = 0;
  var totalC = 0;

  var totalP = 0;

  client.query('SELECT * from attendance where id = $1' , [id], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      rows = result.rows[0];

      manuals = rows.manual_no;
      console.log("heyy " + manuals)
      classroom = rows.classroom_no;

      totalA = parseInt(manuals) + parseInt(classroom);

      client.query('SELECT COUNT (*) FROM meet GROUP BY mtype , unit , myear having unit = $1 and CAST(myear as TEXT) like $2' , [unit , strId.slice(0 , 4) + '%'] , (err ,  result) => {
        if(err){
          throw err;
        }
        else{

          console.log("hell");
          console.log(result);

          if(result.rowCount == 2){

            var row1 = result.rows[0];
            var row2 = result.rows[1];

            totalC = parseInt(row1.count);
            totalM = parseInt(row2.count);

            total = totalM + totalC;


            totalP = ( parseInt(totalA) / parseInt(total) )*100;
          }

          res.send({totalMeets : total , totalManuals : totalM , totalClass : totalC , totalAttendance : totalA , totalManualsAttendance : manuals , totalClassroomAttendance : classroom , totalPercentage : totalP})

        }
      })


    }

  })


});

app.post("/user/query-upload" , function(req,res) {


  const name = req.body.qname;
  const message = req.body.qmessage;
  const email = req.body.qemail;


  client.query('INSERT INTO queries (name , email , message) VALUES($1 , $2 , $3)' , [name , email , message], (err, result) => {
      
    if(err){
        throw err;
    }
    else{

      res.send({sending : "success"})


    }

  })


});

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });


