
const express = require("express")
const cors = require("cors")

const { client } = require("./DBConnect");

const app = express()


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.listen(8000, () => {
    console.log("app listening on port 8000")
  })
  

app.post("/login", function(req, res) {

    const uname = req.body.uname
    const pwd = req.body.pwd

    console.log(uname , pwd)


    var status = "fail"

    client.query('SELECT * from login where id = $1 and password = $2' , [uname , pwd], (err, result) => {
        
        if(err){
            throw err;
        }
        else{

            if(result.rowCount === 1){
                status = "success";
                console.log("hey heree");
            }

            console.log(status);
            res.send({sending : status})
        }

      })

    
})


  app.get("/", (req, res) => {
    res.send("Hello World!");
  });


