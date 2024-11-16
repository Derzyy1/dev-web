// Set the date we're counting down to
var countDownDate = new Date("December 25, 2021").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var diff = new Date(now - countDownDate);
    
  // Time calculations for days, hours, minutes and seconds
  var years = diff.getUTCFullYear() - 1970;
  var months = diff.getUTCMonth();
  var days = diff.getUTCDate() - 1;

let output = [];

if (years > 0) {
	output.push(years + ' LETY');
}

if (months > 0) {
output.push(months + ' MĚSÍCI A ');
}

if (days > 0) {
output.push(days + ' DNY');
}

output = output.join(' ');
console.log(output);
document.getElementById('timer').innerHTML = output;
    
}, 1000);
