document.getElementById("solution").addEventListener("click", solution);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("default").addEventListener("click", defualt);

function defualt () {
    document.getElementById("loanAmount").value = "80000";
    document.getElementById("term").value = "120";
    document.getElementById("interestRate").value = "5";
}


function clear () {
    document.getElementById("loanAmount").value = "";
    document.getElementById("term").value = "";
    document.getElementById("interestRate").value = "";
}


function solution () {
    


    //Collecting user inputs
    let amountLoaned = parseInt(document.getElementById("loanAmount").value);
    let numMonths = parseInt(document.getElementById("term").value);
    let rate = parseInt(document.getElementById("interestRate").value);

    //Monthly Payments 
    let payment = amountLoaned * (rate / 1200) / (1 - Math.pow ( (1 + rate / 1200 ), -numMonths ));
    let monthlyPayments = payment.toFixed(2);
    document.getElementById("monthlyPayments").innerHTML = `$${monthlyPayments} `;

    //Total Principal
    let totalPrinipal = amountLoaned.toFixed(2);
    document.getElementById("totalPrinipal").innerHTML = `$${totalPrinipal} `;

    //Total Interest
    let totalInterestAmount = (numMonths * monthlyPayments) - totalPrinipal;
    let totalInterest = totalInterestAmount.toFixed(2);
    document.getElementById("totalInterest").innerHTML = `$${totalInterest} `;

    //Total Cost
    let totalCostAmount = amountLoaned + totalInterestAmount;
    let totalCost = totalCostAmount.toFixed(2);
    document.getElementById("totalCost").innerHTML = `$${totalCost} `;


}


