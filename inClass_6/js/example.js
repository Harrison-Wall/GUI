// Global variables
var div = document.getElementById("page");
var ul = div.children[2];

// ADD NEW ITEM TO END OF LIST
var liNode = document.createElement('li');
var textNode = document.createTextNode("Bananas");
liNode.appendChild(textNode);

ul.appendChild(liNode);

// ADD NEW ITEM START OF LIST
var liNode2 = document.createElement('li');
var textNode2 = document.createTextNode("Red Grapes");
liNode2.appendChild(textNode2);

ul.insertBefore(liNode2, ul.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var length = ul.children.length;

for( i = 0; i < length; i++)
{
    ul.children[i].className += "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
div.childNodes[3].textContent += " - " + length;