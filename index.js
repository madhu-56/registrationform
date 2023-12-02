const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv=require("dotenv");


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/regDb', { useNewUrlParser: true, useUnifiedTopology: true });

const RegisterSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
   
});
const Registation = mongoose.model("Registation",RegisterSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/pages/index.html");
})
app.post("/register", async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        const existingUser=await Registation.findOne({email: email})
        if(!existingUser){
            const regData=new Registation({
                name,
                email,
                password,
            });
            await  regData.save();
            res.redirect("/success");
        }

       else{
       alert("User already Exist")
res.redirect("/error")
       }
     

    } catch (error) {
      console.log(error)  
      res.redirect("/error")
    }
})
app.get("/success",(req, res)=>{
    res.sendFile(__dirname + "/pages/sucess.html");

})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });