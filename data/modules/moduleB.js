const mongoose =require('mongoose');
const schema=new mongoose.Schema
   ({
    name:{
        type:String,
        requried:true
    },
    phone:{
        type:Number,
        requried:true
    },
    price:{
        type:Number,
        requried:true
    },
    model:{
        type:String,
        requried:true
    }, 
    desc:{
        type:String,
        requried:true
    },
    type:{
        type:String,
        requried:true
    },
    duration:{
        type:Number,
        requried:true
    },
    image:{
        type:String,
        requried:true
    },
    uid:{
        type:String,
        requried:true,
    }, 
},
    {
        timestamps: true 
    }
);
    
module.exports=mongoose.model("buy",schema);