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
        },
        car: CarClass
    }); 

export default mongoose.models.motorcycleParkingLot || ParkingSpot.discriminator("motorcycleParkingLot", schema)