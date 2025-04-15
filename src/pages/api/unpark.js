import dbConnect from '@/lib/mongodb';
import vehicle from '@/models/vehicles/vehicle'
import ParkingHelper from '@/lib/parkingHelper';
import motorcycle from '@/models/vehicles/motorcycle';
import car from '@/models/vehicles/car';
import bus from '@/models/vehicles/bus';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await vehicle.find({parkingLocation: {$ne: null}}).exec();
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
          console.log("request body in parking api: ", req.body)
          const parkingHelper = new ParkingHelper(req.body.vehicle)
          await parkingHelper.initialize()
          const canUnPark = await parkingHelper.unPark()
          if(canUnPark) res.status(200).json({success: true})
          else res.status(501).json({success: false})
      } catch(e) {
          console.log(e)
          res.status(500).json({success: false})
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
