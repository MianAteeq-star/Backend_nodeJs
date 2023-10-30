const mongoose = require('mongoose')

const stdSchema= new mongoose.Schema({
_id: mongoose.Schema.ObjectId,
firstName: String,
lastName: String,
age: Number,
courses: [String],
address:{
street: String,
city: String,
state: String,
zip: String
}
},
{
    collection: "stdData", versionKey:false
});


const Students = mongoose.model('stdData',stdSchema);

module.exports = Students;