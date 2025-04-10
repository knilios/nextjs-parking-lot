import mongoose from 'mongoose';
const { Schema } = mongoose;

options = {discriminatorKey: 'type', collection: 'parkingSpot'}

const parkingSpot = new Schema({
    width: Float64Array,
    hight: Float64Array,
    length: Float64Array
}, options
)

parkingSpot.methods.isFit = function isFit(vehicle) {
    return (vehicle.width - this.width) * (-1) >= 0 && 
            (vehicle.length - this.length) * (-1) >= 0 && 
            (vehicle.hight - this.hight) * (-1) >= 0;
}
parkingSpot.loadClass(ParkingSpot)

export default mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', parkingSpot);


