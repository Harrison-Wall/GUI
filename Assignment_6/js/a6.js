/*
    Harrison Wall
    Harrison_Wall@student.uml.edu
    11/15/18
    COMP 4610 GUI Programming 1
    Homework 6 - Creating an Interacitve dynamic table
*/

function getInput()
{
    var i = document.getElementById("form");   

    // Get input from form
    var min_X = i.elements[0].value;
    var max_X = i.elements[1].value;
    var min_Y = i.elements[2].value;
    var max_Y = i.elements[3].value;

    if( min_X === "" || min_Y === "" || max_X ==="" || max_Y === "" ) // Check that the user filled out form completely
    {
        alert("Make Sure to fill out all boxes.");
    }
    else
    {
        // Convert strings to numbers
        min_X = Number(min_X);
        min_Y = Number(min_Y);
        max_X = Number(max_X);
        max_Y = Number(max_Y);

        if ( validateInput(min_X, max_X, min_Y, max_Y) ) // Validate input
        {
            makeTable(min_X, max_X, min_Y, max_Y);
        } 
    }
}

function validateInput(pMin_X, pMax_X, pMin_Y, pMax_Y)
{
    var retVal = false;

   if( isNaN(pMin_X) || isNaN(pMin_Y) || isNaN(pMax_X) || isNaN(pMax_Y) ) // Check that input are numbers
   {
       alert("Only enter numbers.");
   }
   else if( !isInteger(pMin_X) || !isInteger(pMin_Y) || !isInteger(pMax_X) || !isInteger(pMax_Y) ) // Check that number is an integer
   {
        alert("Only enter integers.");
   }
   else if( pMin_X >= pMax_X || pMin_Y >= pMax_Y) // Check min < max for both sets.
   {
        alert("Max values must be greater than Min values.");
   }
   else if( pMin_X < 1 || pMax_X > 100 || pMin_Y < 1 || pMax_Y > 100 ) // Check values are within range
   {
        alert("Values must range from 1-100.");
   }
   else
   {
       retVal = true;
   }

   return retVal;
}
        
function makeTable(pMin_X, pMax_X, pMin_Y, pMax_Y)
{
    // clear table if there was one already.
    var table = document.getElementById("table");
    table.textContent = "";

    var tempRow = document.createElement("TR");
    var tempData = document.createElement("TD");

    // First column needs an offset
    tempData.innerHTML = ""; 
    tempRow.appendChild(tempData);

    //Create header
    for( var j = pMin_X; j <= pMax_X; j++ )
    {
        tempData = document.createElement("TD");
        tempData.innerHTML = j; 
        tempData.setAttribute("class", "header");
        tempRow.appendChild(tempData);
    }
    table.appendChild(tempRow); // Add header to table

    var isFirstOfRow = true;

    // Create rest of table
    for( var i = pMin_Y; i <= pMax_Y; i++ )
    {
        tempRow = document.createElement("TR");

        for( var j = pMin_X; j <= pMax_X; j++ )
        {
            if( isFirstOfRow ) // First of the row is the left header
            {
                tempData = document.createElement("TD");
                tempData.setAttribute("class", "header");
                tempData.innerHTML = i;
                tempRow.appendChild( tempData );
                isFirstOfRow = false;
            }

            // Add multiplcation result to table
            tempData = document.createElement("TD")
            tempData.innerHTML = j * i;
            tempRow.appendChild(tempData);
        }

        table.appendChild(tempRow); // Add the row containing all the multiplcation results
        isFirstOfRow = true;
    }
}

function isInteger(n)
{
    // If remainder then it is a float/double
    return n % 1 === 0;
}