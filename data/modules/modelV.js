const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the airline reservations
const reservationSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  class: { type: String, default: 'Economy Class' },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  infants: { type: Number, default: 0 },
  tripType: { type: String, default: 'One Way' },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date },
  total: { type: Number, default: 0 },
});

// Create a model based on the schema
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
