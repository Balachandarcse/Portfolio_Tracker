const mdb=require("mongoose");
const signUpSchema=mdb.Schema({
    name:String,
    email:String,
    password:String,
});
const Signup=mdb.model("Signup",signUpSchema);
module.exports=Signup