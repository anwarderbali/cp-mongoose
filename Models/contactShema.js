const mongoose=require("mongoose")
const  Schema  = mongoose.Schema;

const contactSchema = new Schema({
        name: { 
            type:String,
            required:true,
        },
        age: { 
            type:String,
            required:true,
        },

        favoriteFoods:[String] 
});
module.exports=mongoose.model('contact',contactSchema)