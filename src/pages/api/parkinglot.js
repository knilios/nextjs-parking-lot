import dbConnect from '@/lib/mongodb';
import parkingLot from "@/models/parkingLot";
import ParkingLotBuilder from '@/lib/parkingLotBuilder';
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
                const floors = req.body.numberOfFloors;
                const name = req.body.name
                const builder = (new ParkingLotBuilder(name))
                for(let i = 0; i<floors; i++) {
                    builder.addRandomizedLevel(9)
                }
                builder.create()
                res.status(200).json({success: true})
            } catch(e) {
                res.status(500).json({success: false})
            }
            
    }
}