document.getElementById("solution").addEventListener("click", solution);

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
    let totalPrinipal = amountLoaned.toFixed(2)
    document.getElementById("totalPrinipal").innerHTML = `$${totalPrinipal} `;

    //Total Interest
    document.getElementById("totalInterest").innerHTML = `$${monthlyPayments} `;

    //Total Cost
    document.getElementById("totalCost").innerHTML = `$${monthlyPayments} `;
    
}



