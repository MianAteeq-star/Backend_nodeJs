const mongoose = require('mongoose');




const proSchema= new mongoose.Schema({

    _id:mongoose.Schema.ObjectId,
    name:String,
    price:Number,
    category:String,
    tags:[String],
    specification:{
        weight:String,
        dimention:{
            width:String,
            height:String,
            depth:String,
        },
    },


},
{
    collection:"proData", versionKey:false
});



const Products= mongoose.model("proData",proSchema)
module.exports=Products;