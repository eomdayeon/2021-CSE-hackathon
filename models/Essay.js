const mongoose = require('mongoose');
const {Schema} = mongoose;

const essaySchema = new Schema({
    day:{
        type:String,
        required:true
    },
    title2:{
        type:String,
        required:true
    },
    contents:{
        type:String,
        required:true
    },
    references:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Essay',essaySchema);