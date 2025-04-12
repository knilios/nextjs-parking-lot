import mongoose from "mongoose";
import { scheme } from "./level"

const parkingLotScheme = new mongoose.Schema({
  name: String
});

export default mongoose.models.ParkingLot || mongoose.model('ParkingLot', parkingLotScheme);