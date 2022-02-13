/*

PLANNING

Increment opacity of background by .1 for each pass over?

The sidebar will contain all of the controls
    - Button for black mode (selected by default)
    - Button for rainbow mode
    - Button for eraser mode
    - Range input for determing board size (16 block min, 100 block max)
        - Add note to notify user that board will clear if board size is changed
    - Button to clear the board

#eas-board will be the container for the etch-a-sketch
    - Will get value of range input to determine size
    - Will use display grid to align the divs inside

*/


/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/

let currentGridSize = 16;
let currentColor = '#000000';
let currentMouseDownStatus = false;

const clearButton = document.querySelector('#clear');
const colorButton = document.querySelector('#color-fill');
const eraseButton = document.querySelector('#eraser');
const rainbowButton = document.querySelector('#rainbow-fill');

const chosenColor = document.querySelector('#chosen-color');

const gridDimensionsDisplay = document.querySelector('#grid-dimensions-display');
const gridSizeInput = document.querySelector('#grid-size');

const easBoard = document.querySelector('#eas-board');



/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/


function adjustGridSize() {

    // Update number of columns
    easBoard.style.gridTemplateColumns = `repeat(${currentGridSize}, 1fr)`;

    // Remove all existing child nodes
    easBoard.textContent = '';

    // Loop through currentGridSize squared to create grid-blocks
    for( let i = 0; i < currentGridSize * currentGridSize; i++ ){

        const gridBlock = document.createElement('div');
        gridBlock.classList.add('grid-block');

        easBoard.appendChild(gridBlock);

    }

}


function updateCurrentColor( e ) {

    currentColor = e.target.value;
    console.log( currentColor );

}


function updateGridDimensionsDisplay( e ){

    let sizeInputValue = e.target.value;

    gridDimensionsDisplay.innerText = `${sizeInputValue} x ${sizeInputValue}`;

}


function updateBoardGridSize( e ) {

    let sizeInputValue = e.target.value;

    // Update currentGridSize global variable and call adjustGridSize again;
    currentGridSize = sizeInputValue;

    // Clear the board
    clearBoard();

    adjustGridSize();

    // Redeclare gridBlocks and listeners
    gridBlocks = document.querySelectorAll('.grid-block');

    gridBlockListeners();

}


function clearBoard() {

    gridBlocks.forEach( (gridBlock) => {
        gridBlock.style.backgroundColor = 'initial';
    });

}


function fillGridBlocks( e ) {

    console.log('test');

    // If the event trigger was a mousedown set currentMouseDownStatus to true
    if( e.type === 'mousedown' ){
        currentMouseDownStatus = true;
    }

    // If currentMouseDownStatus is false then remove the mouse enter event listener
    if( !currentMouseDownStatus ) {

        // loopGridBlocksRemove('mouseenter', fillGridBlocks );
        gridBlocks.forEach( (gridBlock) => {

            gridBlock.removeEventListener('mouseenter', fillGridBlocks );
    
        });

        return;
        
    } 

    // Update background-color of target block
    e.target.style.backgroundColor = `${currentColor}`;

    // Add event listener for mousenter on grid blocks
    // loopGridBlocksAdd('mouseenter', fillGridBlocks );
    gridBlocks.forEach( (gridBlock) => {

        gridBlock.addEventListener('mouseenter', fillGridBlocks );

    });

}

function gridBlockListeners() {

    gridBlocks.forEach( (gridBlock) => {

        gridBlock.addEventListener('mousedown', fillGridBlocks );
    
        gridBlock.addEventListener('mouseup', () => { 
            currentMouseDownStatus = false;
        } );
    
    });

}


// General function for looping through grid blocks, add event listener
// function loopGridBlocksAdd( domEvent, innerFunction ) {

//     gridBlocks.forEach( (gridBlock) => {

//         gridBlock.addEventListener(domEvent, innerFunction );
    
//     });

// }

// General function for looping through grid blocks, remove event listener
// function loopGridBlocksRemove( domEvent, innerFunction ) {

//     gridBlocks.forEach( (gridBlock) => {

//         gridBlock.removeEventListener(domEvent, innerFunction );
    
//     });

// }



/*/////////////////////////////////////////
Setup and Interaction
/////////////////////////////////////////*/

// Call function to create grid 
adjustGridSize();

// Must be declared after they're created
let gridBlocks = document.querySelectorAll('.grid-block');

// Update #grid-dimensions-display on change and mousemove
gridSizeInput.addEventListener('change', updateGridDimensionsDisplay );
gridSizeInput.addEventListener('mousemove', updateGridDimensionsDisplay );


// Only update actual grid items on change
gridSizeInput.addEventListener('change', updateBoardGridSize );


clearButton.addEventListener('click', clearBoard );


// Update currentColor
chosenColor.addEventListener('change', updateCurrentColor );

gridBlockListeners();