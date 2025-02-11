class Employee{
    employeeId: number;
    employeeName: string;
    salary: number;
    
    constructor(employeeId: number, employeeName: string, salary: number) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.salary = salary;
    }

    calculateBonus(): number {
        let bonus: number = 2000;
        return this.salary + bonus;
    }
}
class Engineer extends Employee{
    constructor(employeeId: number, employeeName: string, salary: number) {
        super(employeeId, employeeName, salary);
    }
    calculateBonus(): number {
        let bonus:number = 3000;
        return this.salary + bonus;
    }

}
class Manager extends Employee{
    constructor(employeeId: number, employeeName: string, salary: number) {
        super(employeeId, employeeName, salary);
    }
    calculateBonus(): number {
        let bonus: number = 5000;
        return this.salary + bonus;
    }
}
 
class Intern extends Employee{
    constructor(employeeId: number, employeeName: string, salary: number) {
        super(employeeId, employeeName, salary);
    }
    calculateBonus(): number {
        let bonus:number = 500;
        return this.salary + bonus;
    }
}

let Employee1 = new Employee(1, "Nihal", 15000);
let Engineer1 = new Engineer(2, "Uzaif", 22000);
let Manager1 = new Manager(3, "Muskan", 25000);
let Intern1 = new Intern(4, "Abdullah", 8000);

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