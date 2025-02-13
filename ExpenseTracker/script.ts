interface IExpense {
    expenseAmount: number;
    categoryOfExpense: ExpenseCategory;
    expenseDesc: string;
    date: string;
}

enum ExpenseCategory {
    Housing = "Housing",
    Transportation = "Transportation",
    Food = "Food",
    Health_Wellness = "Health Wellness",
    Personal_Care = "Personal Care",
    Clothing = "Clothing",
    Entertainment = "Entertainment",
    Education = "Education",
    Communication = "Communication",
    Saving_Investment = "Saving & Investment",
    Miscellaneous = "Miscellaneous"
}

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById("expenseDate") as HTMLInputElement;
    dateInput.value = new Date().toISOString().split('T')[0];
    setupCategoryDropdowns();
    filterOutExpenses(); 
    const categoryDropdown = document.getElementById('mainCategoryDropdown') as HTMLSelectElement;
    categoryDropdown.addEventListener('change', filterOutExpenses);
    dateInput.addEventListener('change', filterOutExpenses);
    const endDateInput = document.getElementById("daterange") as HTMLInputElement;
    endDateInput.addEventListener('change', filterOutExpenses);
});

function filterOutExpenses(): void {
    const selectedDate: string = (document.getElementById("expenseDate") as HTMLInputElement).value;
    const selectedCategory: string = (document.getElementById("mainCategoryDropdown") as HTMLSelectElement).value;
    const endDate: string = (document.getElementById("daterange") as HTMLInputElement)?.value || selectedDate;
    const expenses: IExpense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
    const filteredExpenses: IExpense[] = expenses.filter(
        (expense: IExpense) =>
        expense.date >= selectedDate && expense.date <= endDate &&
        (selectedCategory === '' || expense.categoryOfExpense === selectedCategory)
    );

    createTable(filteredExpenses);
}

function setupCategoryDropdowns(): void {
    const categoryDropdowns = [document.getElementById('expenseCategory') as HTMLSelectElement, document.getElementById('mainCategoryDropdown') as HTMLSelectElement];
    
    categoryDropdowns.forEach((dropdown) => {
        dropdown.innerHTML = `<option value="">Select Category</option>`;
        for (const category in ExpenseCategory) {
            dropdown.innerHTML += `<option value="${ExpenseCategory[category]}">${ExpenseCategory[category]}</option>`;
        }
    });
}

function addExpense(): void {
    let expenseAmount: number = Number((document.getElementById('expenseAmount') as HTMLInputElement).value);
    let categoryOfExpense: ExpenseCategory = (document.getElementById('expenseCategory') as HTMLSelectElement).value as ExpenseCategory;
    let expenseDesc: string = (document.getElementById('expenseDescription') as HTMLInputElement).value;
    const date: string = (document.getElementById("expenseDate") as HTMLInputElement).value;
     if (!expenseAmount || !categoryOfExpense || !expenseDesc) {
        alert("Please fill in all fields.");
        return; 
    }
    const newExpense: IExpense = { expenseAmount, categoryOfExpense, expenseDesc, date };
    saveExpenseToLocalStorage(newExpense);
    filterOutExpenses();
    (document.getElementById('expenseAmount') as HTMLInputElement).value = '';
    (document.getElementById('expenseCategory') as HTMLSelectElement).value = '';
    (document.getElementById('expenseDescription') as HTMLInputElement).value = '';
    const addExpenseModal = document.getElementById('addExpenseModal') as HTMLDivElement;
    const modal = bootstrap.Modal.getInstance(addExpenseModal);
    modal!.hide(); 
   
}

function saveExpenseToLocalStorage(expense: IExpense): void {
    const expenses: IExpense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function createTable(expenses: IExpense[]): void {
    const expenseTableBody = document.getElementById('expenseTableBody') as HTMLTableSectionElement;
    expenseTableBody.innerHTML = '';

    expenses.forEach((expense: IExpense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.categoryOfExpense}</td>
            <td>${expense.expenseDesc}</td>
            <td>₹${expense.expenseAmount}</td>
            <td>${expense.date}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeExpense('${expense.date}', '${expense.expenseDesc}')">Remove</button></td>
        `;
        expenseTableBody.appendChild(row);
    });

    calculateTotalAmount(expenses);
}

function calculateTotalAmount(expenses: IExpense[]): void {
    const totalAmount: number = expenses.reduce((sum: number, expense: IExpense) => sum + expense.expenseAmount, 0);
    (document.getElementById('usedAmount') as HTMLSpanElement).innerText = `₹${totalAmount}`;
}

function removeExpense(date: string, description: string): void {
    const expenses: IExpense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
    const updatedExpenses = expenses.filter(expense => !(expense.date === date && expense.expenseDesc === description));
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    filterOutExpenses(); // Refresh the table
}