// Set the date we're counting down to
var countDownDate = new Date("December 25, 2021").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();
    
    // Calculate the total difference in milliseconds
    var diff = now - countDownDate;

    // Time calculations
    var years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    diff -= years * 1000 * 60 * 60 * 24 * 365.25;

    var months = Math.floor(diff / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    diff -= months * 1000 * 60 * 60 * 24 * (365.25 / 12);

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let output = [];

    if (years > 0) {
        output.push(years + " LETY");
    }

    if (months > 0) {
        output.push(months + " MĚSÍCI");
    }

    if (days > 0) {
        output.push(days + " DNY");
    }

    output = output.join(" ");
    console.log(output);
    document.getElementById('timer').innerHTML = output;
}, 1000);
