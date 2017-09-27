var quotes = [];

function parse() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json", true);
    xmlhttp.send();

    quotes = JSON.parse(request.responseText);

}
 

window.onload = function() {
    parse();
    var rand = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('one').innerHTML = '"' + rand.quoteText + '"' + " - " + rand.quoteAuthor;
    }