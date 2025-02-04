class Employee {
    #salary;  // private field
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;  
        this.#salary = salary;
    }

    getSalary() {
        return this.#salary;
    }

    calculateBonus() {
        const bonus = this.#salary + 1000;
        return `Base Employee Bonus: $${bonus}`;
    }
}

class Manager extends Employee {  
    calculateBonus() {
        const bonus = this.getSalary() + 5000;
        return `Manager Bonus: $${bonus}`;
    }
}

class Engineer extends Employee {
    calculateBonus() {
        const bonus = this.getSalary() + 3000;
        return `Engineer Bonus: $${bonus}`;
    }
}

class Intern extends Employee {
    calculateBonus() {
        const bonus = this.getSalary() + 500;
        return `Intern Bonus: $${bonus}`;
    }
}

// Example usage
const employee = new Employee(1, "John", 2000);
const manager = new Manager(2, "Nihal", 25000);
const engineer = new Engineer(3, "Sarah", 15000);
const intern = new Intern(4, "Alex", 1000);

console.log(employee.calculateBonus());
console.log(manager.calculateBonus());
console.log(engineer.calculateBonus());
console.log(intern.calculateBonus());