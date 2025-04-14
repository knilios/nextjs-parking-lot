import ParkingSpot from "./parkingSpot"
import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = new Schema({
        width: {
            type: Number,
            default: 1
        }, 
        length: {
            type: Number,
            default: 3
        },
        hight: {
            type: Number,
            default: 2
        }
    }); 

export default mongoose.models.MotorcycleParkingSpot || ParkingSpot.discriminator("MotorcycleParkingSpot", schema)