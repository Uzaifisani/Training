var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    Vehicle.prototype.calculateRentalCost = function (days) {
        return days * this.rentPricePerDay;
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, rentalPerDay) {
        return _super.call(this, brand, model, rentalPerDay) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        var TotalRent = _super.prototype.calculateRentalCost.call(this, days);
        if (days > 7 && days < 14) {
            TotalRent *= 0.8;
        }
        else if (days > 14) {
            TotalRent *= 0.7;
        }
        return TotalRent;
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike(brand, model, rentalPerDay) {
        return _super.call(this, brand, model, rentalPerDay) || this;
    }
    Bike.prototype.calculateRentalCost = function (days) {
        var TotalRent = _super.prototype.calculateRentalCost.call(this, days);
        if (days > 7 && days < 14) {
            TotalRent *= 0.9;
        }
        else if (days > 14) {
            TotalRent *= 0.8;
        }
        return TotalRent;
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand, model, rentalPerDay) {
        return _super.call(this, brand, model, rentalPerDay) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        var TotalRent = _super.prototype.calculateRentalCost.call(this, days);
        if (days > 7 && days < 14) {
            TotalRent *= 0.9;
        }
        else if (days > 14 && days < 30) {
            TotalRent *= 0.8;
        }
        else if (days > 30) {
            TotalRent *= 0.7;
        }
        return TotalRent;
    };
    return Truck;
}(Vehicle));
var BMW = new Car("BMW", 2024, 5000);
var rentOfBMW = BMW.calculateRentalCost(9);
console.log("Rent of BMW Car for 9 days is ".concat(rentOfBMW));
var Access = new Bike("Access125", 2020, 450);
var rentOfAccess = Access.calculateRentalCost(3);
console.log("Rent of Access 125 for 3 days is ".concat(rentOfAccess));
var Eicher = new Truck("Pro2010", 2023, 4500);
var rentOfTruck = Eicher.calculateRentalCost(31);
console.log("Rent of Truck for 31 days is ".concat(rentOfTruck));
