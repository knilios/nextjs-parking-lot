import ParkingSpot from "./parkingSpot"
import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = new Schema({
        width: {
            type: Number,
            default: 5
        }, 
        length: {
            type: Number,
            default: 11
        },
        hight: {
            type: Number,
            default: 5
        }
    }); 

export default mongoose.models.LargeParkingSpot || ParkingSpot.discriminator("LargeParkingSpot", schema)