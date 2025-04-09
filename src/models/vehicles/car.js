import Vehicle from "./vehicle"
import mongoose from 'mongoose';
const { Schema } = mongoose;

const carScheme = new Schema({
  width: {
    type: Number,
    default: 1.31
  },
  hight: {
    type: Number,
    default: 2.69
  },
  length: {
    type: Number,
    default: 4.55
  },
  name: String
});



export default mongoose.models.Car || Vehicle.discriminator('Car', carScheme);