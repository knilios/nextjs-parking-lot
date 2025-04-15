import ParkingSpot from '@/models/parkingSpot/parkingSpot'
import Level from '@/models/level'
import vehicle from '@/models/vehicles/vehicle'

class ParkingHelper {
    constructor(vehicleId) {
        console.log("vehicle id : ", vehicleId)
        this.vehicleId = vehicleId
    }

    async initialize() {
        this.vehicle = await vehicle.findOne({_id: this.vehicleId}).exec()
        console.log("vehicle in helper: ", this.vehicle)
    }

    async parkAt(parkingLot) {
        const levels = await Level.find({parkingLot: parkingLot}).exec()
        console.log("levels: ", levels)
        for(let level of levels) {
            const parkingSpots = await ParkingSpot.find({level: level._id}).exec()
            console.log('parkingSpots: ', parkingSpots)
            for(let parkingSpot of parkingSpots) {
                if(parkingSpot.occupied) continue;
                this.vehicle.parkingLocation = parkingSpot._id
                parkingSpot.occupied = true
                await parkingSpot.save()
                await this.vehicle.save()
                return true
            }
        }
        return false
    }

    async unPark() {
        try{
            const parkingSpot = await this.vehicle.populate("parkingLocation")
            console.log(parkingSpot)
            parkingSpot.occupied = false
            this.vehicle.parkingLocation = null
            parkingSpot.save()
            this.vehicle.save()
            return true
        } catch (e) {
            console.error("Error in unPark: ", e)
            return false
        }
    }
}

export default ParkingHelper