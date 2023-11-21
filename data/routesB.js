const express=require('express');
const router =express.Router();
const Pd=require("./modules/moduleB");
router.post('/product/buy/', async (req, res) => {
    console.log("hi");
    try {
      const requestData = req.body; // Assuming req.body is an array of objects
  
      // Process each item in the array
    //   for (const item of requestData) {
        const { name, phone, price, model, type, duration, image, uid } = requestData;
        const dat = new Pd({
          name: name,
          phone: phone,
          price: price,
          model: model,
          type: type,
          duration: duration,
          image: image,
          uid: uid,
        });
        await dat.save();
        console.log("Item saved:", dat);
    //   }
  
      res.status(200).json({ message: "Items saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.post(`/product/cart/:id`, async (req, res) => {
    console.log("hi");
    const i=req.params.id;
    try {
      const requestData = req.body; // Assuming req.body is an array of objects
  
      // Process each item in the array
      for (const item of requestData) {
        const { name, phone, price, model, type, duration, image, uid } = item;
        const dat = new Pd({
          name: name,
          phone: phone,
          price: price,
          model: model,
          type: type,
          duration: duration,
          image: image,
          uid: i,
        });
        await dat.save();
        console.log("Item saved:", dat);
      }
  
      res.status(200).json({ message: "Items saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.get("/product/bu/:id",async(req,res)=>{
    console.log("recived");
    const i=req.params.id;
    console.log(i);
    try{
        console.log(i)
        const dat=await Pd.find({uid:i}).then(data=> res.json(data));
        res.status(200);
     }
     catch(error){
         res.status(500).json({error:error.message});
     }
})
router.delete('/product/de/:id',async(req,res)=>{
    try{
        const i=req.params.id; 
       const dat=await Pd.findByIdAndDelete(i);
       res.status(200).json({message:"del success"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports=router; 