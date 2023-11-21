const express=require("express");
const routerU=express.Router();
const usc=require("./modules/modelU");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'tharuntharun7248@gmail.com',
    pass: 'stsr ymjz stnf yxea',
  },
});
routerU.post('/:id', (req, res) => {
  const i=req.params.id;
  console.log("kl");
  const otp = Math.floor(1000 + Math.random() * 9000); 
  console.log(otp);// Generate a 4-digit OTP
  const mailOptions = {
    from: 'tharuntharun7248@gmail.com',
    to:i,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent: ' + info.response);
      console.log()
      res.status(200).json({ message: 'OTP sent successfully', da:otp});
    }
  });
});
routerU.post("/user/insertion",async(req,res)=>{
      console.log(req.body);
      try{
        const { uname, umail, upassword, uadd, phone} = req.body;
        function generateRandomString(length) {
          const charset = "abcdefghijklmnopqrstuv💕xyzABCDEFGHIJKLMNOPQRS❤️😁TUVWXYZ0123456789";
          let result = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
          }return result;
        }
        const random = generateRandomString(7);

        // Create a new user instance
        const user = new usc({
          umail: umail,
          upassword: upassword,
          phone: phone,
          uadd: uadd,
          uname: uname,
          uid: random // You can include this if needed
        });
        await user.save();
        res.status(200).json({message:"yse..",s:true,user});
        console.log("done");
      }catch(error){
        res.status(5000).json({message:"server error"});
      }
});
routerU.post("/c/:id",async(req,res)=>{
  const i=req.params.id;
  try{
    const dat=await usc.findOne({umail:i}).then((data)=>{
      if(data){
         res.status(200);
    }else{
      res.status(500);
    }});
  }catch(error){
    console.log(error);
  }
})
routerU.post("/user/search", async (req, res) => {
  const um = req.body.umail;
  const up = req.body.upassword;
  console.log(um);
  console.log(up);
  try {
    const user = await usc.findOne({
      umail: um,
      upassword: up,
    });
    if (user) {
      console.log("yes");
      res.status(200).json({
        message: "login success",
        success: true,
        user, // Include the user's name directly
      });
    } else {
      console.log("no");
      res.status(401).json({ message: "username or password incorrect", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports=routerU;