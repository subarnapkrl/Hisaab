
const form=document.querySelector(".add");

 let transactions=localStorage.getItem("transactions")!==null? JSON.parse(localStorage.getItem("transactions")):[];



const incomeList=document.querySelector("ul.income-list");
const expenseList=document.querySelector("ul.expense-list");


const balance=document.getElementById("balance")
const income=document.getElementById("income");
const expense=document.getElementById("expense")

function updateStatistics()
{
    const updatedIncome=transactions.filter((transaction)=>{
        return transaction.amount>0
    }).reduce((total,filteredTransaction)=>{
        return total=total+filteredTransaction.amount
    },0);

    const updatedExpense=transactions.filter((transaction)=>{
        return transaction.amount<0;
    }).reduce((total,filteredTransaction)=>{
        return total=total+Math.abs(filteredTransaction.amount)
    },0);


    


     // Check if the elements exist before updating their textContent
    if (balance) {
        const updatedBalance = updatedIncome - updatedExpense;
        balance.textContent = updatedBalance;
    }

    if (income) {
        income.innerText = updatedIncome;
    }

    if (expense) {
        expense.textContent = updatedExpense;
    }
}


function generateTemplate(id,source,amount,time)
{
    return `<li data-id="${id}">
                                            <p>
                                                <span>${source}</span>
                                                <span id="time">${time}</span>
                                            </p>
                                            <span>NPR ${Math.abs(amount)}</span>
                                            <p class=" delete">Delete</p>
                </li>`
}
function addTransactionDOM(id,source,amount,time)
{
    if(amount>0){
        incomeList.innerHTML+=generateTemplate(id,source,amount,time)
    }else{
        expenseList.innerHTML+=generateTemplate(id,source,amount,time)
    }
}
function addTransaction(source,amount)
{
    const time=new Date();
    const transaction={
        id:Math.floor(Math.random()*500),
        source:source,
        amount:amount,
        time:`${time.toLocaleTimeString()} ${time.toLocaleDateString()} `
    }
    transactions.push(transaction)
    localStorage.setItem("transactions",JSON.stringify(transactions))
    addTransactionDOM(transaction.id,source,amount,transaction.time)
}

function getTransaction()
{
    transactions.forEach((transaction)=>{
        if(transaction.amount>0){
            incomeList.innerHTML+=generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time)
        }else{
            expenseList.innerHTML+=generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time)
        }
    })
}

incomeList.addEventListener("click",e=>{
    if(e.target.classList.contains("delete")){
        //This one is for removing from DOM
        e.target.parentElement.remove();
        //This one is for removing from "transactions" array[]
        deleteTransaction(Number(e.target.parentElement.dataset.id))
        updateStatistics()
    }
})
expenseList.addEventListener("click",e=>{
    if(e.target.classList.contains("delete")){
        //This one is for removing from DOM
        e.target.parentElement.remove();
        //This one is for removing from "transactions" array[]
        deleteTransaction(Number(e.target.parentElement.dataset.id))
        updateStatistics()
    }
})
function deleteTransaction(id)
{
    console.log(id);
    transactions=transactions.filter((transaction)=>{
        
        return transaction.id!==id;
    });
    localStorage.setItem("transactions",JSON.stringify(transactions))
}








form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(form.source.value.trim()==="" || form.amount.value.trim()===""){
        alert("Please add valid value!")
    }
    addTransaction(form.source.value.trim(),Number(form.amount.value))
    updateStatistics()
    form.reset()
    
});

function init()
{
    getTransaction();
updateStatistics()
}

init()

