class Vehicle {
    constructor() {
        this.width;
        this.hight; 
        this.length;
    }

    isFit(parkingSpot) {
        return parkingSpot.width - self.width >= 0 && 
                parkingSpot.length - self.length >= 0 && 
                parkingSpot.hight - self.hight >= 0;
    }
    
}