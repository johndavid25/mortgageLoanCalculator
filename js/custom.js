document.getElementById("solution").addEventListener("click", solution);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("default").addEventListener("click", defualt);

function defualt () {
    document.getElementById("loanAmount").value = "100000";
    document.getElementById("term").value = "360";
    document.getElementById("interestRate").value = "5";
}


function clear () {
    document.getElementById("loanAmount").value = "";
    document.getElementById("term").value = "";
    document.getElementById("interestRate").value = "";
}


document.getElementById("scheduleTable").style.visibility = "hidden";  

//Calculate the loan payment
function calcPayment(amount, rate, term) {
    return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}

//Calcuate the interest for the current balance of the loan
function calcInterest(balance, rate) {
    return balance * rate;
}

//this function will build our loan schedule
function solution() {
    
    //Make the table visible I don't want the table show unless there are values
    document.getElementById("scheduleTable").style.visibility = "visible";    


    //Get the values from out inputs
    let amount = document.getElementById("loanAmount").value;
    let rate = document.getElementById("interestRate").value;
    let term = document.getElementById("term").value;

    //Convert the input rate to a monthly rate
    rate = rate / 1200;

    //Calulate the payments

    //setup some variables that hold values in the schedule
    let payment = calcPayment(amount, rate, term);
    let balance = amount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;

    //Write the results to our table
    let scheduleBody = document.getElementById("scheduleBody");
    let scheduleRow = "";
    //reset the table
    scheduleBody.innerHTML = "";

    for (month = 1; month <= term; month++) {

        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;

        //Write these values to the table
        scheduleRow = `<tr><td>${month}</td>
        <td>${payment.toFixed(2)}</td>
        <td>${monthlyPrincipal.toFixed(2)}</td>
        <td>${monthlyInterest.toFixed(2)}</td>
        <td>${totalInterest.toFixed(2)}</td>
        <td>${balance.toFixed(2)}</td>
        </tr>`;

        scheduleBody.innerHTML += scheduleRow;
    }

    document.getElementById("payment").innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    document.getElementById("totalPrincipal").innerHTML = Number(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    document.getElementById("totalInterest").innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    let totalCost = Number(amount) + totalInterest;

    document.getElementById("totalCost").innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

}



