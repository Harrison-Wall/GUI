/*
    Harrison Wall
    Harrison_Wall@student.uml.edu
    COMP 6410 - GUI Programming 1
    Assignment 9 - Scrabble 
*/

// Globals for easier access
var ScrabbleTiles = [] ;
var wordScore  = 0;
var totalScore = 0;
var tilesLeft  = 100;

// Droppable options, global so it can be resued when destryoying and recreating droppables
var dropOps = 
{
    tollerance: "fit",
    drop: function(event, ui) 
    { 
        $(this).droppable('option', 'accept', ui.draggable);

        //Unhide the <img>
        $(this).children(0).show();

        // Move the ui.draggable.context info into the droppable div
        this.children[0].src = ui.draggable.context.children[0].src;
        this.children[1].innerText = ui.draggable.context.children[1].innerText;

        //hide the draggable's <img>
        $("#"+ui.draggable.context.id).hide();
    },
};

$(function()
{
    // Inintialize
    initDrags();
    initDrops();
    initTileArr( );

    // Create 7 pieces
    fillDrags();

/*****  Add event listeners to buttons ***/
    // When user submits a word
    document.getElementById("subBut").addEventListener("click", function()
    {
        // Add to Total Score
        calcWordScore();
        totalScore += wordScore;
        document.getElementById("totalScore").innerText = totalScore;
        document.getElementById("currWord").innerText = 0;

        // Reset the draggables
        clearDrops();

        // Replace any used draggables
        replaceDrags();
        resetDrags();
    });

    // Refresh the tiles ( generate new ones and replace existing )
    document.getElementById("refBut").addEventListener("click", function()
    {
        // put any moved back to thier location
        resetDrags();

        // Remove any draggables that are in the drops
        clearDrops();

        // Remove Data from draggables
        clearDrags();

        // Add new tiles
        fillDrags();

    });

    // Calculate word score but don't submit
    document.getElementById("wrdBut").addEventListener("click", function()
    {
        // calculate word score
        calcWordScore();

        // update HTML
        document.getElementById("currWord").innerText = wordScore;

    });

    // But the draggables back to their original location
    document.getElementById("resBut").addEventListener("click", function()
    {
        resetDrags();

        // hide the droppables
        // clear the droppables
        clearDrops();

    });
});



// initialize all the droppables
function initDrops()
{
    var spaces = document.getElementById("scrabble_board").children;
    var i;

    // initialize each board space as a droppable
    for(i = 0; i < spaces.length; i++)
    {
        $("#"+spaces[i].id).droppable( dropOps ); 
        $("#"+spaces[i].children[0].id).hide(); // Hide thier <img> for now
    }
}



// Clear Droppables Data
function clearDrops()
{
    
    var spaces = document.getElementById("scrabble_board").children;
    var i;

    for(i = 0; i < spaces.length; i++)
    {
        // destroy droppable
        $("#"+spaces[i].id).droppable("destroy");
    
        // Clear data, hide <img>
        spaces[i].children[1].innerText = "";
        spaces[i].children[0].src = "";
        $("#"+spaces[i].children[0].id).hide();

        // Re initialize to they can be re-used
        $("#"+spaces[i].id).droppable( dropOps ); 
    }

}


function resetDrags()
{
    var pieces = document.getElementById("pieces_set").children;
    var i;

    // Unhide the draggables, put back to original location
    for( i = 0; i < pieces.length; i++ )
    {
        $("#"+pieces[i].id).show();
        
        //SHOUT OUT TO THIS GUY: https://stackoverflow.com/a/40677585 
        $("#"+pieces[i].id).css( {"left": "", "top": ""} );
    }
}

// generate new draggable tiles
function replaceDrags()
{
    var pieces = document.getElementById("pieces_set").children;
    var i = 0;

    for(i = 0; i < pieces.length; i++)
    {
        var bool = $("#"+pieces[i].children[0].id).is(":visible"); // If its visible it hasn't been used

        if( bool ) // Not Hidden
        {
            // NOP
        }
        else
        {
            if( tilesLeft > 0 ) // Make sure we can still give a piece
            {
                // Generate a new child for every draggable in a droppable
                obj = getRandPiece();
                pieces[i].children[0].src       = obj.imgSrc;
                pieces[i].children[1].innerText = obj.char;
            }
            else
            {
                alert("Game Over - Out of Tiles");
                break;
            }
        }
    }
    //update information
    document.getElementById("tilesLeft").innerText = tilesLeft;
}



// initialize the draggables
function initDrags()
{
    var pieces = document.getElementById("pieces_set").children;
    var i;
    var dragOps = 
    {
        cursor: "move",
        revert: "invalid",
        snap: true,
        snapMode: "outer"
    };

    for(i = 0; i < pieces.length; i++)
    {
        $("#"+pieces[i].id).draggable( dragOps ); 
    }
}




// Add tiles data to the draggables
function fillDrags()
{
    var pieces = document.getElementById("pieces_set").children;
    var i;
    var obj;

    for(i = 0; i < pieces.length; i++)
    {
        // If the it is empty then it can be used 
        if( (pieces[i].children[1].innerHTML === "") && (tilesLeft > 0))
        {
            // get a random tile from the array
            obj = getRandPiece();
            pieces[i].children[0].src       = obj.imgSrc;
            pieces[i].children[1].innerText = obj.char;
        }
    }

    // Update tilesLeft HTML
    document.getElementById("tilesLeft").innerText = tilesLeft;
    
}


function clearDrags()
{
    var pieces = document.getElementById("pieces_set").children;
    var i;

    for(i = 0; i < pieces.length; i++)
    {
        // Add the data back to the tilesArray
        ScrabbleTiles[ pieces[i].children[1].innerText ].remaining++;
        tilesLeft++;

        // Clear data from the draggables html
        pieces[i].children[0].src       = "";
        pieces[i].children[1].innerText = "";
    }

    // update tilesLeft HTML
    document.getElementById("tilesLeft").innerText = tilesLeft;

}



function getRandPiece()
{
    var retObj = {"char": "!", "imgSrc": "notFound"};
    var validPiece = false;
    var randPlace = "";

    while( !validPiece ) // Keep generating ranndom while looking for a piece
    {
        randPlace = String.fromCharCode( Math.floor( Math.random() * 27 ) + 65 ); // A-Z + Blank = 0-26

        // Check for Blank
        if( randPlace === "[" )
            randPlace = "_";

        // Check we can take a piece
        if( ScrabbleTiles[ randPlace ].remaining >= 1 )
        {
            validPiece = true;
            ScrabbleTiles[ randPlace].remaining--;

            retObj.imgSrc = ScrabbleTiles[ randPlace ].imgLoc;
            retObj.char   = randPlace;

            // Update the tilesLeft
            tilesLeft--;
        }
    }

    return retObj;
}


function calcWordScore()
{
    var spaces = document.getElementById("scrabble_board").children;
    var i;
    var retVal = 0;
    var doubleWord = false;

    for(i = 0; i < spaces.length; i++)
    {
        // TODO DOUBLE WORD AND DOUBLE LETTER SCORE

        if( spaces[i].children[1].innerText != "" )
        {
            retVal += ScrabbleTiles[ spaces[i].children[1].innerText ].value;

            if( i == 2 ) // Double Word Score
                doubleWord = true;
            
            if( i == 6 ) // Doubel Letter Score
                retVal += ScrabbleTiles[ spaces[i].children[1].innerText ].value;
        }
        else
        {
            break;
        }
    }

    if( doubleWord )
    {
        retVal *= 2;
    }

    wordScore = retVal;
}


function initTileArr( )
{
    // modified array based on Professor Hienes model
    ScrabbleTiles["A"] = { "value" : 1,  "original" : 9,  "remaining" : 9,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_A.jpg"     } ;
    ScrabbleTiles["B"] = { "value" : 3,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_B.jpg"     } ;
    ScrabbleTiles["C"] = { "value" : 3,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_C.jpg"     } ;
    ScrabbleTiles["D"] = { "value" : 2,  "original" : 4,  "remaining" : 4,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_D.jpg"     } ;
    ScrabbleTiles["E"] = { "value" : 1,  "original" : 12, "remaining" : 12, "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_E.jpg"     } ;
    ScrabbleTiles["F"] = { "value" : 4,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_F.jpg"     } ;
    ScrabbleTiles["G"] = { "value" : 2,  "original" : 3,  "remaining" : 3,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_G.jpg"     } ;
    ScrabbleTiles["H"] = { "value" : 4,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_H.jpg"     } ;
    ScrabbleTiles["I"] = { "value" : 1,  "original" : 9,  "remaining" : 9,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_I.jpg"     } ;
    ScrabbleTiles["J"] = { "value" : 8,  "original" : 1,  "remaining" : 1,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_J.jpg"     } ;
    ScrabbleTiles["K"] = { "value" : 5,  "original" : 1,  "remaining" : 1,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_K.jpg"     } ;
    ScrabbleTiles["L"] = { "value" : 1,  "original" : 4,  "remaining" : 4,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_L.jpg"     } ;
    ScrabbleTiles["M"] = { "value" : 3,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_M.jpg"     } ;
    ScrabbleTiles["N"] = { "value" : 1,  "original" : 6,  "remaining" : 6,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_N.jpg"     } ;
    ScrabbleTiles["O"] = { "value" : 1,  "original" : 8,  "remaining" : 8,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_O.jpg"     } ;
    ScrabbleTiles["P"] = { "value" : 3,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_P.jpg"     } ;
    ScrabbleTiles["Q"] = { "value" : 10, "original" : 1,  "remaining" : 1,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_Q.jpg"     } ;
    ScrabbleTiles["R"] = { "value" : 1,  "original" : 6,  "remaining" : 6,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_R.jpg"     } ;
    ScrabbleTiles["S"] = { "value" : 1,  "original" : 4,  "remaining" : 4,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_S.jpg"     } ;
    ScrabbleTiles["T"] = { "value" : 1,  "original" : 6,  "remaining" : 6,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_T.jpg"     } ;
    ScrabbleTiles["U"] = { "value" : 1,  "original" : 4,  "remaining" : 4,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_U.jpg"     } ;
    ScrabbleTiles["V"] = { "value" : 4,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_V.jpg"     } ;
    ScrabbleTiles["W"] = { "value" : 4,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_W.jpg"     } ;
    ScrabbleTiles["X"] = { "value" : 8,  "original" : 1,  "remaining" : 1,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_X.jpg"     } ;
    ScrabbleTiles["Y"] = { "value" : 4,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_Y.jpg"     } ;
    ScrabbleTiles["Z"] = { "value" : 10, "original" : 1,  "remaining" : 1,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_Z.jpg"     } ;
    ScrabbleTiles["_"] = { "value" : 0,  "original" : 2,  "remaining" : 2,  "imgLoc" : "images/Scrabble_Tiles/Scrabble_Tile_Blank.jpg" } ;

    return;
}