var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
        console.log("".concat(employee.name, " Added Successfully!"));
    };
    Department.prototype.removeEmployee = function (id) {
        // this.employees = this.employees.filter(emp => emp.id !== id);
        this.employees = this.employees.filter(function (emp) {
            return emp.id !== id;
        });
        console.log("Employee id: ".concat(id, " Removed Successfully!"));
    };
    Department.prototype.getTotalSalary = function () {
        return this.employees.reduce(function (total, emp) { return total + emp.salary; }, 0);
    };
    Department.prototype.listEmployees = function () {
        var names = this.employees.map(function (emp) { return emp.name; });
        console.log(names);
    };
    return Department;
}());
//IF we remove the T generic and Directly pass only Iemployee it works
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
var HR = new Department();
HR.addEmployee({
    id: 1,
    name: "Muskan",
    position: "HR MANAGER",
    salary: 600000
});
var emp2 = {
    id: 2,
    name: "UZaif",
    position: "Tech Lead",
    salary: 550000
};
HR.addEmployee(emp2);
HR.removeEmployee(1);
var totalSalary = HR.getTotalSalary();
console.log(totalSalary);
HR.listEmployees();
var UpdatedSalary = JSON.stringify(updateSalary(emp2, 650000));
console.log("Update Salary: ".concat(UpdatedSalary));
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.arr = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.arr.push(item);
        console.log("".concat(item, " Added Successfully!!"));
    };
    GenericStorage.prototype.remove = function (item) {
        this.arr.filter(function (i) { return i !== item; });
        console.log("".concat(item, " Removed Successfully!!"));
    };
    GenericStorage.prototype.getAll = function () {
        console.log(this.arr);
    };
    return GenericStorage;
}());
var num = new GenericStorage();
num.add(1);
num.add(5);
num.add(2);
num.add(3);
num.getAll();
num.remove(1);
//String
var names = new GenericStorage();
names.add("Uzaif");
names.add("Nihal");
names.add("Muskan");
names.add("Ammar");
names.add("Iqra");
names.getAll();
names.remove("Ammar");
