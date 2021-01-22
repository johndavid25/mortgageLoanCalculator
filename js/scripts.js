/*!
    * Start Bootstrap - Agency v6.0.3 (https://startbootstrap.com/theme/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict



//Wire up our button
document.getElementById("btnCalc").addEventListener("click", buildSchedule);

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
function buildSchedule() {
    
    //Make the table visible I don't want the table show unless there are values
    document.getElementById("scheduleTable").style.visibility = "visible";    


    //Get the values from out inputs
    let amount = document.getElementById("loanAmount").value;
    let rate = document.getElementById("loanRate").value;
    let term = document.getElementById("loanTerm").value;

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