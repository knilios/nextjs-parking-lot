import Vehicle from "./vehicle"
import mongoose from 'mongoose';
const { Schema } = mongoose;

const carScheme = new Schema({
  width: {
    type: Number,
    default: 2.5
  },
  hight: {
    type: Number,
    default: 3.2
  },
  length: {
    type: Number,
    default: 10
  },
  name: String
});



export default mongoose.models.Car || Vehicle.discriminator('Car', carScheme);