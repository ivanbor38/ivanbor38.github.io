

var quotes = [];

function parse() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json", true);
    xmlhttp.send();

    quotes = JSON.parse(request.responseText);

}
 

window.onload = function() {
    //document.getElementById('one').innerHTML = "quote from JS";
    parse();
    //var rand = quotes[Math.floor(Math.random() * quotes.length)];
    
    rand = quotes[0]; 
    //document.getElementById('one').innerHTML =  rand.quoteText  + " - " + rand.quoteAuthor;
    
    document.getElementById('one').innerHTML = rand;
    }
    
    
    

    
function add_new(){
    

    var main_div = document.getElementsByTagName("div");
    
    // add new quote
    var sub_div = document.createElement("p");
    sub_div.ids.add('one');
    sub_div.innerHTML = rand.quoteText  + " - " + rand.quoteAuthor;

    main_div.appendChild("powpowpow");

//    var node = document.createTextNode("This is new.");
}

/*
window.onload = function() {
        
    document.getElementById('one').innerHTML = "quote from JS";
    }
*/