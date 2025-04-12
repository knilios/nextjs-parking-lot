import mongoose from 'mongoose';
const { Schema } = mongoose;
options = {discriminatorKey: 'type', collection: 'vehicle'}
const schema = new Schema({
    width: Number,
    hight: Number,
    length: Number,
    name: String,
    parkingLocation: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpots'}
})

export default mongoose.models.Vehicle || mongoose.model("Vehicle", schema)

// https://mongoosejs.com/docs/advanced_schemas.html