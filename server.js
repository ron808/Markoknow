const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require('mongoose')
const app = express();
var assert = require('assert');


app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Markoknow');

const clientSchema = mongoose.Schema({
    id:{
        type:String,
        // require:[true]
    },
    date:{
        type:Date,
        require:[true]
    },
    user_id:{
        type:String,
        // require:[true]
    },    
    client_name:{
        type:String,
        require:[true]
    },    
    client_mail:{
        type:String,
        require:[true]
    },
    client_phone:{
        type:Number,
        require:[true]
    },
    meeting_time:{
        type:String,
        require:[true]
    },
    comments:{
        type:String,
    },
})

const userSchema = mongoose.Schema({
    user_name:{
        type:String,
        require:[true]
    },    
    user_mail:{
        type:String,
        require:[true]
    },
    user_password:{
        type:String,
        require:[true]
    }
})

const Client = mongoose.model('Client',clientSchema);
const User = mongoose.model('User',userSchema);


app.post("/",(req,res)=>{

    const {name, mail, phone, time} = req.body;
    const now_time = Date.now() / 1000

    console.log(req.body);

    try {
    const new_client = new Client({
        client_name:name,
        client_mail:mail,
        client_phone:phone,
        meeting_time:time,
        date:now_time
    })
    new_client.save();

    res.status(200).json({ success: true, message: 'Data added successfully', data: new_client });
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to add data', error: error.message });
}
})

app.post("/login",async(req,res)=>{

    const {mail, password} = req.body;

    console.log(req.body);

    try {
    const find_user = await User.findOne({user_mail:mail,user_password:password}).exec()
        
        find_user !== null ? 
    res.status(200).json({ success: true, message: 'Data added successfully', data: find_user })
    :
    res.status(500).json({ success: false, message: 'No user found', error: error.message });

} catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add data', error: error.message });
}
})


app.post("/signup",(req,res)=>{

    const {name, mail, password} = req.body;
    const now_time = Date.now() / 1000

    console.log(req.body);

    try {
    const new_user = new User({
        user_name:name,
        user_mail:mail,
        user_password:password

    })
    new_user.save();

    res.status(200).json({ success: true, message: 'Data added successfully', data: new_client });
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to add data', error: error.message });
}
})


app.get("/meet",(req,res)=>{


        const meet_list = Client.find({}).exec();
        meet_list.then(clients=>{
            res.json(clients);
        }) 
    
    })

app.listen(5000,()=>{
    console.log("5000 is running")
})