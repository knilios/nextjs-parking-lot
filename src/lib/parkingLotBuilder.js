import Level from "../models/level"
import ParkingLot from '../models/parkingLot'
import CompactParkingSpot from '@/models/parkingSpot/compactParkingSpot'
import LargeParkingSpot from '@/models/parkingSpot/largeParkingSpot'
import MotorcycleParkingSpot from '@/models/parkingSpot/motorcycleParkingSpot'

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

class ParkingLotBuilder {
    constructor(name) {
        this.levelNumber = 1
        this.levels = []
        this.levelStructure = []
        this.name = name
        this.parkingLot = new ParkingLot({name: this.name})
    }
    
    async addLevel(...parkingSpotSpecs) {
        /**
         * Adds a level to the parking lot.
         * @param parkingSpotSpecs - a json of {parkingSpot: uninitialized parkingSpot, amount: } - The structure must be like this!
         * 
         */
        const level = await Level.create({
            parkingLot: this.parkingLot._id,
            number: this.levelNumber
        });
        this.levelNumber++;
        console.log("level id: ", level)
        for(let spec of parkingSpotSpecs) {
            console.log(spec)
            for(let i = 0; i<spec.amount; i++) spec.parkingSpot.create({level: level._id, occupied: false});
        }
        return this;
    }

    async addRandomizedLevel(spotAmount) {
        let compactAmount = getRandomInt(spotAmount);
        let motorcycleAmount = getRandomInt(spotAmount - compactAmount);
        let largeAmount = spotAmount - compactAmount - motorcycleAmount;
        console.log("Amounts: ", compactAmount, motorcycleAmount, largeAmount)
        await this.addLevel(
            {
                parkingSpot: CompactParkingSpot,
                amount: compactAmount
            },
            {
                parkingSpot: MotorcycleParkingSpot,
                amount: motorcycleAmount
            },
            {
                parkingSpot: LargeParkingSpot,
                amount: largeAmount
            },
        )
        return this
    }

    create() {
        this.parkingLot.save()
        return this.parkingLot
    }
}

export default ParkingLotBuilder