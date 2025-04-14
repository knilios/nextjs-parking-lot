import dbConnect from '@/lib/mongodb';
import parkingLot from "@/models/parkingLot";
import ParkingHelper from '@/lib/parkingHelper';
import Parking from '../parking';
export default async function handler(req, res) { 
    await dbConnect();

    const { method } = req;
    
    switch(method) {
        case 'GET':
            const parkingLots = await parkingLot.find({})
            res.status(200).json({success: true, data: parkingLots})
            break
        
        case 'POST':
            try {
                console.log("request body in parking api: ", req.body)
                const parkingHelper = new ParkingHelper(req.body.vehicle)
                await parkingHelper.initialize()
                const canPark = await parkingHelper.parkAt(req.body.parkingLot)
                if(canPark) res.status(200).json({success: true})
                else res.status(501).json({success: false})
            } catch(e) {
                console.log(e)
                res.status(500).json({success: false})
            }
            

        default:
            res.status(400).json({success: false})
    }
}