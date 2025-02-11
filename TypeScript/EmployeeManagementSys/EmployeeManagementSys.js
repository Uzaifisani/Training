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
var Employee = /** @class */ (function () {
    function Employee(employeeId, employeeName, salary) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.salary = salary;
    }
    Employee.prototype.calculateBonus = function () {
        var bonus = 2000;
        return this.salary + bonus;
    };
    return Employee;
}());
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer(employeeId, employeeName, salary) {
        return _super.call(this, employeeId, employeeName, salary) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        var bonus = 3000;
        return this.salary + bonus;
    };
    return Engineer;
}(Employee));
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(employeeId, employeeName, salary) {
        return _super.call(this, employeeId, employeeName, salary) || this;
    }
    Manager.prototype.calculateBonus = function () {
        var bonus = 5000;
        return this.salary + bonus;
    };
    return Manager;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern(employeeId, employeeName, salary) {
        return _super.call(this, employeeId, employeeName, salary) || this;
    }
    Intern.prototype.calculateBonus = function () {
        var bonus = 500;
        return this.salary + bonus;
    };
    return Intern;
}(Employee));
var Employee1 = new Employee(1, "Nihal", 15000);
var Engineer1 = new Engineer(2, "Uzaif", 22000);
var Manager1 = new Manager(3, "Muskan", 25000);
var Intern1 = new Intern(4, "Abdullah", 8000);
console.log("Employee1 salary After Bonus is " + Employee1.calculateBonus());
console.log("Engineer1 salary After Bonus is " + Engineer1.calculateBonus());
console.log("Manager1 salary After Bonus is " + Manager1.calculateBonus());
console.log("Intern1 salary After Bonus is " + Intern1.calculateBonus());
/*
OUTPUT :
PS C:\Users\uzaif\OneDrive\Desktop\Assignment\Training> node .\TypeScript\EmployeeManagementSys.js
Employee1 salary After Bonus is 17000
Engineer1 salary After Bonus is 25000
Manager1 salary After Bonus is 30000
Intern1 salary After Bonus is 8500

*/ 
