"use strict"
var userSearch = '';

function renderCoffee(coffee) {
    // Original function refactored to a switch based on Roast Type to allow for roast-specific styling of coffee display
    switch(coffee.roast){
        case "light":
            var html = '<div class="coffee light">';
            html += '<h3>' + coffee.name + '</h3>';
            html += '<div class="roast lt"><h4>' + coffee.roast + '</h4></div>';
            html += '</div>';
            break;
        case "medium":
            var html = '<div class="coffee medium">';
            html += '<h3>' + coffee.name + '</h3>';
            html += '<div class="roast med"><h4>' + coffee.roast + '</h4></div>';
            html += '</div>';
            break;
        case "dark":
            var html = '<div class="coffee dark">';
            html += '<h3>' + coffee.name + '</h3>';
            html += '<div class="roast drk"><h4>' + coffee.roast + '</h4></div>';
            html += '</div>';
            break;
    }
    return html;
}
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
function updateCoffees(e) {
    //e.preventDefault(); // don't submit the form, we just want to update the data
    var filteredCoffees = [];
    var selectedRoast = roastSelection.value;
    if (typeof userSearch !== 'undefined') {
        var searchStringLC = userSearch.toLowerCase();
    }
    coffees.forEach(function(coffee) {
        var localCoffee = coffee.name.toLowerCase();
        if(localCoffee.includes(searchStringLC) && ((coffee.roast === selectedRoast)||(selectedRoast === 'all'))){
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}
// Defining the Default Coffee Objects Array
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// The following code block shifts the displayed coffee list to those that match the current search criteria
// based on the current roast value selected AND the current search string. Both functions are on "input"
// and so are responsive as the search is typed without the need for submission.
var tbody = document.querySelector('#coffees');
var roastSelection = document.querySelector('#roast-selection');
var inputDetect = document.querySelector('#site-search');
tbody.innerHTML = renderCoffees(coffees);
inputDetect.addEventListener('input', updateSearch);
function updateSearch(e) {
    userSearch = e.target.value;
    updateCoffees();
}
roastSelection.addEventListener('input', updateCoffees);

// IMPLEMENTING ADD COFFEE FORM FUNCTIONALITY ///
const addCoffee = document.querySelector('#submit');
addCoffee.addEventListener('click', function (event) {
    event.preventDefault()
    coffeeAdd();
});
function coffeeAdd () {
    let coffeeNameLC = document.querySelector('#add-coffee').value.toLowerCase();
    let coffeeName = capitalizeNames(coffeeNameLC);
    let newID = coffees.length + 1;
    let coffeeRoast = document.querySelector('#added-roast').value;
    coffees.push({id: newID, name:coffeeName, roast:coffeeRoast});
    localStorage['coffees'] = JSON.stringify(coffees); /// ADDED LOCAL STORAGE ////
    console.log(coffees);
    updateCoffees();
}
function capitalizeNames(string){
    var name = string.split(' ');
    var secondWord = '';
    if(name.length === 2){
        secondWord = name[1];
        secondWord = secondWord[0].toUpperCase() + secondWord.substring(1);
    }
    var firstWord = name[0];
    var capitalizedFirstWord = firstWord[0].toUpperCase() + firstWord.substring(1);
    return capitalizedFirstWord + " " + secondWord;
}
//// LOCAL STORAGE ADD TO CURRENT ARRAY AND DISPLAY //////
window.onload = function(){
    let storedCoffee = JSON.parse(localStorage.getItem('coffees'));
    console.log(storedCoffee);
    for (let i = 14; i < storedCoffee.length; i++) {
        coffees.push(storedCoffee[i]);
    }
    updateCoffees();
}

// All following media Queries and event listeners are for display-switching for the twitter pop-up
// order form, and coffee size descriptions.
// Twitter Hide Listener
const banishTweet = document.querySelector('#dismissal');
const tweetyDiv = document.querySelector('#twitter-fixed');
banishTweet.addEventListener('click', function (event) {
    tweetyDiv.style.display = 'none';
});

// Form listeners
// Displays the order form and images, size descriptions, as well as hiding the
// default shown forms (search/filter and add coffee)
// Currently more complicated than it needs to be, but allows for compartmentalization
// if further changes are made to parent divs
const orderNow = document.querySelector('#order-now');
const functionSrch = document.querySelector('#form-srch');
const functionAdd = document.querySelector('#form-add');
const sizeGuide = document.querySelector('#size-guide');
const functionOrder = document.querySelector('#order-form');
const backButton = document.querySelector('#back-to-search');
const bigImg = document.querySelector('#big-coffee');
const hugeImg = document.querySelector('#huge-coffee');
const galonImg = document.querySelector('#galon-coffee');
const sizeDescription = document.querySelector('#size-descript');

// First Button (CAFFEINATE!) that hides previous forms and shows order form
orderNow.addEventListener('click', function (event) {
    functionSrch.style.display = 'none';
    functionAdd.style.display = 'none';
    orderNow.style.display = 'none';
    functionOrder.style.display = 'block';
    backButton.style.display = 'block';
    sizeGuide.style.display = 'block';
});
// Second Button, hides order form and size images and shows search/add forms
backButton.addEventListener('click', function (event) {
    functionSrch.style.display = 'block';
    functionAdd.style.display = 'block';
    orderNow.style.display = 'block';
    functionOrder.style.display = 'none';
    backButton.style.display = 'none';
    sizeGuide.style.display = 'none'
});

// Images for each size will display their size description on 'click'.
bigImg.addEventListener('click', function (event) {
    sizeDescription.innerHTML = "Our Smallest Coffee, the 32 ounce 'Big', is recommended as the maximum size " +
        "for people with heart conditions or other underlying health issues, for that great KICK! you need in " +
        "the morning!";
});
hugeImg.addEventListener('click', function (event) {
    sizeDescription.innerHTML =  "Our mid-sized Coffee, the 64 oz 'Huge', about half of a gallon, is our most popular" +
        " amongst 'Essential Workers', conveniently packaged in an IV bag for immediate effect. Also Compatible with" +
        " common hydration packs, and always available with a 25% discount to all Essential Workers, Military, " +
        "Government, Law Enforcement, and First Responders.";
});
galonImg.addEventListener('click', function (event) {
    sizeDescription.innerHTML = "Our Largest Coffee, the Galon, is 1 full gallon, 128 ounces of pure joy. Enough " +
        "even for those who are desensitized to normal caffeine doses. Available in various industrial containers" +
        " to-go, or in our trademark Easy-Share-Bowl Mugs";
});

// Exorbitant Price calculator and display function
var priceTotal = document.querySelector('#price-total');
var sizeToBuy = document.querySelector('#coffee-size');
var qtyToBuy = document.querySelector('#quantity');
sizeToBuy.addEventListener('input', updatePrice);
qtyToBuy.addEventListener('input',updatePrice);
function updatePrice(){
    let qty = qtyToBuy.value * 2;
    let size = sizeToBuy.value * 3;
    priceTotal.innerHTML = "Price: $" + (size * qty).toFixed(2);
}
