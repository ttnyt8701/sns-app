const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    desc:{type:String,max:200},
    img:{type:String},//パスを入れるため
    likes:{type:Array,default:[]},
    isEdited:{type:Boolean,default:false},
    commented:{type:String},
    comments: {type:Array,default:[]}
    
},
{timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);