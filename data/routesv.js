const express = require('express');
const mongoose = require('mongoose');
const Reservation=require('./modules/modelV')
const app=express.Router();
app.post("/:id", async(req, res) => {
  const i=req.params.id;
  const formData = req.body;
  const data=new Reservation({
    from:formData.from,
    to:formData.to,
    class:formData.class,
    adutuls:formData.adults,
    childran:formData.children,
    infants:formData.infants,
    tripType:formData. tripType,
    departureDate:formData.departureDate,
    returnDate: formData.returnDate,
    total:i
  });
  await data.save()
    .then(savedReservation => {
      console.log('Reservation saved:', savedReservation);
      res.status(201).json({ message: 'Reservation saved successfully' });
    })
    .catch(error => {
      console.error('Error saving reservation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
module.exports=app;
