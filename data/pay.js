require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto=require("crypto");

// router.post("/orders", async (req, res) => {
  
//         const order = await instance.orders.create(options);

//         if (!order) return res.status(500).send("Some error occured");

//         res.json(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
module.exports.orders=(req,res)=>{
    console.log(req.body.amount);
        let instance = new Razorpay({
            key_id: process.env.PKEY,
            key_secret: process.env.PSEC,
        });
        
        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        instance.orders.create(options, function(err, order) {
            if(err){
                return res.send({code:500,message:"server Error"})
            }
            return res.send({code:200,message:"order done",data:order})
          });
}
module.exports.verify=(req,res)=>{
console.log("verification")
let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_parent_id;
var expectedSignature = crypto.createHmac('sha256', process.env.PSEC)
.update(body.toString()) .digest('hex');
var response = { "signatureIsValid": "false" }
if (expectedSignature === req.body.response.razorpay_signature){
    res.send({code:200,message:"sigin valid"});
}else{
    res.send({code:500,message:"sigin invalid"});
}

}
