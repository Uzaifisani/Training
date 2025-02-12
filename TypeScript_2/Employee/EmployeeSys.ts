interface IEmployee{
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface IManager extends IEmployee{
    teamSize: number;
}

class Department{
    private employees: IEmployee[]=[];

    addEmployee(employee: IEmployee): void{
        this.employees.push(employee);
        console.log(`${employee.name} Added Successfully!`);
    }

    removeEmployee(id: number): void{
        // this.employees = this.employees.filter(emp => emp.id !== id);
        this.employees = this.employees.filter(emp => {
            return emp.id !== id; 
        });
         console.log(`Employee id: ${id} Removed Successfully!`);
    }
    getTotalSalary(): number{
        return this.employees.reduce((total, emp) => total + emp.salary, 0);
    }
    listEmployees(): void{
        const names = this.employees.map(emp => emp.name);
        console.log(names);
    }
    
}

//IF we remove the T generic and Directly pass only Iemployee it works
function updateSalary<T extends IEmployee>(employee: T, newSalary: number):T {
    return {...employee, salary: newSalary}
}

const HR = new Department();
HR.addEmployee({
    id:1,
    name: "Muskan",
    position: "HR MANAGER",
    salary: 600000
});
let emp2 = {
    id: 2,
    name: "UZaif",
    position: "Tech Lead",
    salary:550000
}
HR.addEmployee(emp2);
HR.removeEmployee(1);
let totalSalary = HR.getTotalSalary();
console.log(totalSalary);
HR.listEmployees();
let UpdatedSalary =JSON.stringify(updateSalary(emp2, 650000));
console.log(`Update Salary: ${UpdatedSalary}`);

class GenericStorage<T>{
    private arr: T[] = [];

    add(item: T): void{
        this.arr.push(item);
        console.log(`${item} Added Successfully!!`);
    }

    remove(item: T): void{
        this.arr.filter(i => i !== item);
         console.log(`${item} Removed Successfully!!`);
    }
    getAll(): void{
        console.log(this.arr);
    }
}

let num = new GenericStorage<number>();
num.add(1);
num.add(5);
num.add(2);
num.add(3);
num.getAll();
num.remove(1);
//String
let names = new GenericStorage<string>();
names.add("Uzaif");
names.add("Nihal");
names.add("Muskan");
names.add("Ammar");
names.add("Iqra");
names.getAll();
names.remove("Ammar");

/**
 * OUTPUT
Muskan Added Successfully!
UZaif Added Successfully!
Employee id: 1 Removed Successfully!
550000
[ 'UZaif' ]
Update Salary: {"id":2,"name":"UZaif","position":"Tech Lead","salary":650000}

Generic:
1 Added Successfully!!
5 Added Successfully!!
2 Added Successfully!!
3 Added Successfully!!
[ 1, 5, 2, 3 ]
1 Removed Successfully!!
Uzaif Added Successfully!!
Nihal Added Successfully!!
Muskan Added Successfully!!
Ammar Added Successfully!!
Iqra Added Successfully!!
[ 'Uzaif', 'Nihal', 'Muskan', 'Ammar', 'Iqra' ]
Ammar Removed Successfully!!
 */