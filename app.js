const mongoose= require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()



const app= express()





app.use(cors())
app.use(express.json())




// Router


const routes= require("./src/Router/Student-router")
app.use("/",routes)
const productRout= require("./src/Router/Product-router")
app.use("/",productRout)

// CONNECTION WITH MONGOOSE


mongoose.connect(process.env.STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db= mongoose.connection;

db.on('error',(error)=>{
    console.log("Mongodb error : ", error);
})
db.once("open",()=>{
    console.log("Mongodb On Sucessfully");

})

// PORT

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`);
})