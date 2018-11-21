/*
    Harrison Wall
    Harrison_Wall@student.uml.edu
    11/23/18
    COMP 4610 GUI Programming 1
    Homework 7 - JQuery Validation
*/

// Followed Examples and documentation here: https://jqueryvalidation.org/documentation/

$(function () 
{
    $("#form").validate(
    {
        // Each input has its own rules
        rules: 
        {
            // Each has to be a whole number from 1 to 100.
          min_Multiplicand: 
          {
            number: true, 
            range: [1,100],
            digits: true,
            required: true
          },
          max_Multiplicand: 
          {
            number: true,
            range: [1,100],
            digits: true,
            required: true
          },
          min_Multiplier: 
          {
            number: true,
            range: [1,100],
            digits: true,
            required: true
          },
          max_Multiplier: 
          {
            number: true,
            range: [1,100],
            digits: true,
            required: true
          }
        },
    
        // What message to print if there is an error
        messages: 
        {
          min_Multiplicand: 
          {
            number: "Input must be a number.",
            range: "Values must be between 1 and 100",
            digits: "Whole number values only",
            required: "Must Enter input."
          },
          max_Multiplicand: 
          {
            number: "Input must be a number.",
            range: "Values must be between 1 and 100",
            digits: "Whole number values only",
            required: "Must Enter input."
          },
          min_Multiplier: 
          {
            number: "Input must be a number.",
            range: "Values must be between 1 and 100",
            digits: "Whole number values only",
            required: "Must Enter input."
          },
          max_Multiplier: 
          {
            number: "Input must be a number.",
            range: "Values must be between 1 and 100",
            digits: "Whole number values only",
            required: "Must Enter input."
          }
        },
    
        submitHandler: function()  // When user clicks submit in form
        {
            var i = document.getElementById("form");   

            // Get input from form
            var min_X = i.elements[0].value;
            var max_X = i.elements[1].value;
            var min_Y = i.elements[2].value;
            var max_Y = i.elements[3].value;

            makeTable(min_X, max_X, min_Y, max_Y);
        }
    });
});
  
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

    //If min > Max, swap the values
    var tempNum;
    
    if( pMin_X > pMax_X )
    {
        tempNum = pMin_X;
        pMin_X = pMax_X;
        pMax_X = tempNum;
    }
    
    if( pMin_Y > pMax_Y )
    {
        tempNum = pMin_Y;
        pMin_Y = pMax_Y;
        pMax_Y = tempNum;
    }

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