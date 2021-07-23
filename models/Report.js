const mongoose = require('mongoose');
const {Schema} = mongoose;

const reportSchema = new Schema({
    days:{
        type:String,
        required:true
    },
    reports:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Report',reportSchema);