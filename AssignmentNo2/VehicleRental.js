class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    constructor(brand, model, rentPricePerDay, hasAC) {
        super(brand, model, rentPricePerDay);
        this.hasAC = hasAC;
    }

    calculateRentalCost(days) {
        let cost = super.calculateRentalCost(days);
        // Add 10% if car has AC
        return this.hasAC ? cost * 1.1 : cost;
    }
}

class Bike extends Vehicle {
    constructor(brand, model, rentPricePerDay, isElectric) {
        super(brand, model, rentPricePerDay);
        this.isElectric = isElectric;
    }

    calculateRentalCost(days) {
        let cost = super.calculateRentalCost(days);
        // 20% discount for non-electric bikes
        return this.isElectric ? cost : cost * 0.8;
    }
}

class Truck extends Vehicle {
    constructor(brand, model, rentPricePerDay, capacity) {
        super(brand, model, rentPricePerDay);
        this.capacity = capacity; // capacity in tons
    }

    calculateRentalCost(days) {
        let cost = super.calculateRentalCost(days);
        // Add 5% per ton of capacity
        return cost * (1 + (this.capacity * 0.05));
    }
}

// Example usage:
const car = new Car("Toyota", "Camry", 50, true);
const bike = new Bike("Giant", "Defy", 20, false);
const truck = new Truck("Volvo", "FH16", 200, 10);

console.log(car.calculateRentalCost(3));    // With AC: 165 (150 + 10%)
console.log(bike.calculateRentalCost(2));   // Non-electric: 32 (40 - 20%)
console.log(truck.calculateRentalCost(4));  // With 10-ton capacity: 1000 (800 + 25%)
