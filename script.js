let list = document.getElementById("list");
let balance = document.getElementById("balance");
let income = document.getElementById("money-plus");
let expense = document.getElementById("money-minus");
let form = document.getElementById("form")
let inputText = document.getElementById("text")
let inputAmount = document.getElementById("amount")



// placeholer for local stoarage 

let dummyTransactions = [
    { id: 1, text: "rent", amount: -200 },
    { id: 2, text: "pay", amount: 800 },
    { id: 3, text: "food", amount: -100 },
    { id: 4, text: "something", amount: 160 },

]

// copy of placeholder so no mutations 

let transactions = dummyTransactions;

// set Ui 
function init() {
    transactions.forEach((i) => {
        list.appendChild(createTransactionItem(i))
    })
}
function appendTransactionsToDom() {
    list.innerHTML = ''
    transactions.forEach((i) => {
        list.appendChild(createTransactionItem(i))
    })

}

//  ----- function to create dom list element 

function createTransactionItem(i) {

    let item = document.createElement("li");
    let sign = i.amount > 0 ? "+" : "-";
    item.className = i.amount > 0 ? "plus" : "minus";
    item.innerHTML =
        `${i.text}<span>${sign}${Math.abs(i.amount)}</span>
        <button onclick='removeItem(${i.id})' class='delete-btn'>x</button>`
    return item


}


function removeItem(id) {
    transactions = transactions.filter(i => {
        return i.id !== id
    })
    appendTransactionsToDom()
    calculateTotals(transactions)
}



// ---------- calculate totals 

function calculateTotals(transactions) {

    let incomeTotal = transactions
        .filter(i => i.amount > 0)
        .map(i => i.amount)
        .reduce((acc, current) => acc + current, 0);

    income.innerText = incomeTotal;

    let expenseTotal = transactions
        .filter(i => i.amount < 0)
        .map(i => i.amount)
        .reduce((acc, current) => acc + current, 0);
    income.innerText = incomeTotal;

    expense.innerText = expenseTotal;

    let total = transactions
        .map(i => i.amount)
        .reduce((acc, current) => acc + current, 0)

    balance.innerText = total;
}

function addItem() {
    // get value from inputs 

    function getRandomId() {
        return Math.floor(Math.random() * 2000)
    }

    transactions.push({
        id: getRandomId(),
        text: inputText.value,
        amount: +inputAmount.value
    })



}


calculateTotals(transactions)

init()

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem()
    appendTransactionsToDom()
    calculateTotals(transactions)


})

