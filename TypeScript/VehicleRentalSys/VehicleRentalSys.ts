// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).
class Vehicle{
    private brand: string;
    private model: number;
    private rentPricePerDay: number;
    constructor(brand:string, model:number, rentPricePerDay:number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    calculateRentalCost(days: number): number{
        return days * this.rentPricePerDay;
    }
}
class Car extends Vehicle{
    constructor(brand: string, model: number, rentalPerDay: number) {
        super(brand, model, rentalPerDay);
    }
    calculateRentalCost(days: number): number {
        let TotalRent =  super.calculateRentalCost(days);
        if (days >7 && days< 14) {
            TotalRent *= 0.8;
        } else if (days > 14) {
            TotalRent *= 0.7;
        }
        return TotalRent;
    }
}
class Bike extends Vehicle{
    constructor(brand: string, model: number, rentalPerDay: number) {
        super(brand, model, rentalPerDay);
    }
    calculateRentalCost(days: number): number {
        let TotalRent =  super.calculateRentalCost(days);
        if (days >7 && days< 14) {
            TotalRent *= 0.9;
        } else if (days > 14) {
            TotalRent *= 0.8;
        }
        return TotalRent;
    }
}
class Truck extends Vehicle{
    constructor(brand: string, model: number, rentalPerDay: number) {
        super(brand, model, rentalPerDay);
    }
    calculateRentalCost(days: number): number {
        let TotalRent =  super.calculateRentalCost(days);
        if (days >7 && days< 14) {
            TotalRent *= 0.9;
        } else if (days > 14 &&  days<30) {
            TotalRent *= 0.8;
        }
        else if (days > 30) {
            TotalRent *= 0.7;
        }
        return TotalRent;
    }
}

const BMW = new Car("BMW", 2024, 5000);
let rentOfBMW=BMW.calculateRentalCost(9);
console.log(`Rent of BMW Car for 9 days is ${rentOfBMW}`);

const Access = new Bike("Access125", 2020, 450);
let rentOfAccess = Access.calculateRentalCost(3);
console.log(`Rent of Access 125 for 3 days is ${rentOfAccess}`);

const Eicher = new Truck("Pro2010", 2023, 4500);
let rentOfTruck = Eicher.calculateRentalCost(31);
console.log(`Rent of Truck for 31 days is ${rentOfTruck}`);

/*
OUTPUT:
Rent of BMW Car for 9 days is 36000
Rent of Access 125 for 3 days is 1350
Rent of Truck for 31 days is 97650
 */