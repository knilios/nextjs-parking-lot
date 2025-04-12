import ParkingSpot from "./parkingSpot/parkingSpot"
import mongoose from 'mongoose';

const levelScheme = new mongoose.Schema({
  number: Number,
  parkingLot: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot'}
});

export default mongoose.models.Level || mongoose.model('Level', levelScheme);