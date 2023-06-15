const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({


    "username":{type:String,required:true},
    "title": {type:String,required:true},
    "content": {type:String,required:true},
    "category": {type:String,required:true},
    "date": {type:String,required:true},
    "likes": {type:Number,required:true},
    "comments": []

})
const BlogModel=mongoose.model("blogs",blogSchema)

module.exports={BlogModel}