import mongoose from 'mongoose';
const { Schema } = mongoose;

const options = {discriminatorKey: 'type', collection: 'parkingSpot'}


const parkingSpot = new Schema({
    width: Number,
    hight: Number,
    length: Number,
    level: {type: mongoose.Schema.Types.ObjectId, ref: 'Level'},
    occupied: Boolean
}, options
)

parkingSpot.methods.isFit = function isFit(vehicle) {
    return (vehicle.width - this.width) * (-1) >= 0 && 
            (vehicle.length - this.length) * (-1) >= 0 && 
            (vehicle.hight - this.hight) * (-1) >= 0;
}

export default mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', parkingSpot);


