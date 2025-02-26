const express=require('express')
const path=require('path')
const mdb=require("mongoose")
const dotenv=require("dotenv")
const Signup=require("./models/SignupSchema")
const bcrypt=require("bcrypt")
const cors=require("cors")

const app=express()

dotenv.config(); 
app.use(cors());
app.use(express.urlencoded());
app.use(express.json())
mdb.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected successfully")
}).catch((err)=>{
    console.log(err)
})

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    var hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await Signup.findOne({
            $or: [{ email }, { name }]
        });
        if (existingUser) {
            return res.status(400).json({ error: existingUser.email === email ? "Email already exists" : "Username already exists" });
        }
        const newCustomer = new Signup({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newCustomer.save();
        res.status(201).send("yooo!");
        console.log("value recived")
    } catch (e) {
        res.status(500).send("internal error signup unsuccessful")
        console.log("unSuccessful")

    }
})

app.get('/login',async(req,res)=>{
    const {name,password}=req.body;
    try{
        const User= await Signup.findOne({email});
        if(!User){
            return res.status(402).json({message:"User doesn't exits",isvalid:false});
        }
        const isMatch=await bcrypt.compare(password,User.password);
        if(!isMatch){
            return res.status(402).json({ message: "Invalid password" ,isvalid:false});
        }
        res.status(201).json({ message: "Login successful", isvalid:true});
    }catch(e){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get('/stocks',async(req,res)=>{
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "TOP_GAINERS_LOSERS",
                        apikey: API_KEY
                    }
                }
            );

            if (response.data.top_gainers) {
                const topStocks = response.data.top_gainers.slice(0, 15).map(stock => ({
                    symbol: stock["ticker"],
                    price: stock["price"],
                    change: stock["change_percent"],
                    volume: stock["volume"]
                }));
                res.status(201).json({data: topStocks}); 
            }
            
           
        } catch (error) {
            res.status(500).json({ data:null,message: "Internal server error" });
        }
    

})
app.listen(3001,()=>{
    console.log("server is started");
    
}) 

