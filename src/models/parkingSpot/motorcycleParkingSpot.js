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
        },
        car: CarClass
    }); 

export default mongoose.models.motorcycleParkingLot || ParkingSpot.discriminator("motorcycleParkingLot", schema)