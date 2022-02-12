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

/*
Global Variables
*/

let currentGridSize = 16;
let currentColor = '#000';

const clearButton = document.querySelector('#clear');
const colorButton = document.querySelector('#color-fill');
const eraseButton = document.querySelector('#eraser');
const rainbowButton = document.querySelector('#rainbow-fill');

const chosenColor = document.querySelector('#chosen-color');

const gridDimensionsDisplay = document.querySelector('#grid-dimensions-display');
const gridSize = document.querySelector('#grid-size');

const easBoard = document.querySelector('#eas-board');

/*
Functions
*/

function adjustGridSize() {

    for( let i = 0; i < currentGridSize * currentGridSize; i++ ){

        const gridBlock = document.createElement('div');
        gridBlock.classList.add('grid-block');

        easBoard.appendChild(gridBlock);

    }

}

/*
Setup and Interaction
*/

// Call function to create grid 
adjustGridSize();