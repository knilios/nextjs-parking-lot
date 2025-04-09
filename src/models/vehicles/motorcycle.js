import Vehicle from "./vehicle"
import mongoose from 'mongoose';
const { Schema } = mongoose;

const motorcycleScheme = new Schema({
  width: {
    type: Number,
    default: 0.68
  },
  hight: {
    type: Number,
    default: 1.35
  },
  length: {
    type: Number,
    default: 2.04
  },
  name: String
});



export default mongoose.models.Motorcycle || Vehicle.discriminator('Motorcycle', motorcycleScheme);

