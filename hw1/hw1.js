
// global variable, parses json
var quotes = [];

// added quotes history 
var so_far = [];

// unique authors
var authors = []; 


// <author, array of his quotes> dictionary
var auth_dict = {};


// function parses json and adds content to global array quotes 
// and to global array authors

function parse() {

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.open("GET", "https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json", false);
    xmlhttp.send();

    quotes = JSON.parse(xmlhttp.responseText);
    for (i = 0;  i <  quotes.length; i++) {
        if (authors.includes(quotes[i].quoteAuthor) == false) {
            authors.push(quotes[i].quoteAuthor);
        }
    }
}


// function iterates over quotes array and 
// returns <author, array of his quotes> dictionary

function get_auth_dict() {
    
    for (x = 0; x < quotes.length; x++) {
        if (auth_dict[quotes[x].quoteAuthor] != undefined) {
            if (auth_dict[quotes[x].quoteAuthor].includes(quotes[x].quoteText) == false) {
                auth_dict[quotes[x].quoteAuthor].push(quotes[x].quoteText);
            }
        }
        else {
            auth_dict[quotes[x].quoteAuthor] = [];
            auth_dict[quotes[x].quoteAuthor].push(quotes[x].quoteText);
        }
    }
    return auth_dict;
}

//function inserts all unique authors 
// to drop-down list in alphabetical order

function insert_authors() { 
    var x = document.getElementById("list_of_authors");
    authors.sort();
    for (z = 0; z < authors.length; z++) {
        option = document.createElement("option");
        option.innerHTML = authors[z];
        option.value = authors[z];
        
        x.appendChild(option);
    }
    
} 


// function chooses random quote from quotes array
// and returns this in string format

function rand_quote() {
    rand = quotes[Math.floor(Math.random() * quotes.length)];
    return '"' + rand.quoteText + '"' + ' - ' 
     + rand.quoteAuthor;
    
}

// function adds new quote on html page and checks
// that this quote is not already on the page
// BUTTON "Add new"

function add_new(){
    
    var main = document.getElementById("main");
    var sub_div = document.createElement("div");
    sub_div.classList.add('quote');
    
    while (true) {
        tmp2 = rand_quote();
        sub_div.innerHTML = tmp2;
        if (so_far.includes(tmp2) == false) {
            break;
        }
    }

    main.appendChild(sub_div);
    so_far.push(tmp2);
}
 

// function erases html page and outputs 
// all qoutes of the selected author
// SELECT drop-down list
 
function distinct_author() {

    erase_all();
    document.getElementById("fst").disabled = true;
    document.getElementById("sec").disabled = true;
    document.getElementById("third").disabled = true;

    var author = document.getElementById("list_of_authors").value;
    var quotes_list = auth_dict[author];
 
    quotes_list.sort();
    
    for (i = 0; i < quotes_list.length; i++) {
        add_sth(quotes_list[i]);
    }
}


// helping function. it is useful inside 
// the loops
  
function add_sth(x){
    
    var main = document.getElementById("main");
    var sub_div = document.createElement("div");
    
    sub_div.classList.add('quote');
    sub_div.innerHTML = x;
    main.appendChild(sub_div);
   
}


// function sort quotes on the page
// BUTTON "Sort"

function sort_quotes() {
    if (so_far.length < 2) {
        return true;
    }
    erase();
    
    so_far.sort();
    
    for (i=0; i< so_far.length; i++) {
        
        add_sth(so_far[i]);
    }
}
 

// function erases all quotes from html page 

function erase() {
    if (so_far.length < 2) {
        add_new();
    } 
    var node = document.getElementById("main");
    
    while (node.lastChild.className == "quote") {
        chld = node.children[1];
        node.removeChild(chld);
    }
}


// function erases all quotes from html page 
// and erases all from so_far array

function erase_all() {
    
    erase();
    so_far = [];
    
    document.getElementById("fst").disabled = false;
    document.getElementById("sec").disabled = false;
    document.getElementById("third").disabled = false;
    
}


// function erases all quotes from html page, 
// erases all from so_far array
// and chooses "All authors" option 
// on the drop-down list
// BUTTON "Clear all"

function update_drop_down_list(){
    erase_all();
    select = document.getElementById("list_of_authors");
    select.selectedIndex = 0;
    add_new();
}


// function changes quote of the day
// BUTTON "Change Quote Of the Day"

function change_quote_of_the_day() {
    erase_all();
    add_new();
}



// function parses JSON, 
// makes <author, array of his quotes> dictionary,
// adds authors to drop-down list,
// chooses random quote from array,
// adds this on the page and 
// appends it to the so_far (history) array

window.onload = function() {
    
    parse();
    get_auth_dict();
    insert_authors();
    tmp = rand_quote();
    document.getElementById('hlp').innerHTML = tmp;
    so_far.push(tmp);
    }
    


// when some author is choosed - disable all buttons except clear all
// if you type clear all --> list of quotes should be clear, author selector
// should be in the default position