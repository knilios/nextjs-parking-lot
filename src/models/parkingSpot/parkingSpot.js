class ParkingSpot {
    isFit(vehicle) {
        return (vehicle.width - this.width) * (-1) >= 0 && 
                (vehicle.length - this.length) * (-1) >= 0 && 
                (vehicle.hight - this.hight) * (-1) >= 0;
    }

    isOccupied() {
        if(!this.car) {
            return true;
        }
        return false;
    }

    parkCar(car) {
        this.car = car
    }

    removeCar() {
        this.car = undefined
    }
}

