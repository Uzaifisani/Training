var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["Housing"] = "Housing";
    ExpenseCategory["Transportation"] = "Transportation";
    ExpenseCategory["Food"] = "Food";
    ExpenseCategory["Health_Wellness"] = "Health Wellness";
    ExpenseCategory["Personal_Care"] = "Personal Care";
    ExpenseCategory["Clothing"] = "Clothing";
    ExpenseCategory["Entertainment"] = "Entertainment";
    ExpenseCategory["Education"] = "Education";
    ExpenseCategory["Communication"] = "Communication";
    ExpenseCategory["Saving_Investment"] = "Saving & Investment";
    ExpenseCategory["Miscellaneous"] = "Miscellaneous";
})(ExpenseCategory || (ExpenseCategory = {}));
document.addEventListener('DOMContentLoaded', function () {
    var dateInput = document.getElementById("expenseDate");
    dateInput.value = new Date().toISOString().split('T')[0];
    setupCategoryDropdowns();
    filterOutExpenses();
    var categoryDropdown = document.getElementById('mainCategoryDropdown');
    categoryDropdown.addEventListener('change', filterOutExpenses);
    dateInput.addEventListener('change', filterOutExpenses);
    var endDateInput = document.getElementById("daterange");
    endDateInput.addEventListener('change', filterOutExpenses);
});
function filterOutExpenses() {
    var _a;
    var selectedDate = document.getElementById("expenseDate").value;
    var selectedCategory = document.getElementById("mainCategoryDropdown").value;
    var endDate = ((_a = document.getElementById("daterange")) === null || _a === void 0 ? void 0 : _a.value) || selectedDate;
    var expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    var filteredExpenses = expenses.filter(function (expense) {
        return expense.date >= selectedDate && expense.date <= endDate &&
            (selectedCategory === '' || expense.categoryOfExpense === selectedCategory);
    });
    createTable(filteredExpenses);
}
function setupCategoryDropdowns() {
    var categoryDropdowns = [document.getElementById('expenseCategory'), document.getElementById('mainCategoryDropdown')];
    categoryDropdowns.forEach(function (dropdown) {
        dropdown.innerHTML = "<option value=\"\">Select Category</option>";
        for (var category in ExpenseCategory) {
            dropdown.innerHTML += "<option value=\"".concat(ExpenseCategory[category], "\">").concat(ExpenseCategory[category], "</option>");
        }
    });
}
function addExpense() {
    var expenseAmount = Number(document.getElementById('expenseAmount').value);
    var categoryOfExpense = document.getElementById('expenseCategory').value;
    var expenseDesc = document.getElementById('expenseDescription').value;
    var date = document.getElementById("expenseDate").value;
    if (!expenseAmount || !categoryOfExpense || !expenseDesc) {
        alert("Please fill in all fields.");
        return;
    }
    var newExpense = { expenseAmount: expenseAmount, categoryOfExpense: categoryOfExpense, expenseDesc: expenseDesc, date: date };
    saveExpenseToLocalStorage(newExpense);
    filterOutExpenses();
    var addExpenseModal = document.getElementById('addExpenseModal');
    var modal = bootstrap.Modal.getInstance(addExpenseModal);
    modal.hide();
}
function saveExpenseToLocalStorage(expense) {
    var expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
function createTable(expenses) {
    var expenseTableBody = document.getElementById('expenseTableBody');
    expenseTableBody.innerHTML = '';
    expenses.forEach(function (expense) {
        var row = document.createElement('tr');
        row.innerHTML = "\n            <td>".concat(expense.categoryOfExpense, "</td>\n            <td>").concat(expense.expenseDesc, "</td>\n            <td>\u20B9").concat(expense.expenseAmount, "</td>\n            <td>").concat(expense.date, "</td>\n        ");
        expenseTableBody.appendChild(row);
    });
    calculateTotalAmount(expenses);
}
function calculateTotalAmount(expenses) {
    var totalAmount = expenses.reduce(function (sum, expense) { return sum + expense.expenseAmount; }, 0);
    document.getElementById('usedAmount').innerText = "\u20B9".concat(totalAmount);
}
