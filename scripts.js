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
let currentFill = 'color';

const clearButton = document.querySelector('#clear');
const fillButtons = document.querySelectorAll('.fill-button');

const chosenColor = document.querySelector('#chosen-color');

const gridDimensionsDisplay = document.querySelector('#grid-dimensions-display');
const gridSizeInput = document.querySelector('#grid-size');

const easBoard = document.querySelector('#eas-board');



/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/


// Helper Functions
////////////////////


function gridBlockListeners() {

    gridBlocks.forEach( (gridBlock) => {


        gridBlock.addEventListener('mousedown', fillGridBlocks );
    
        // Remove mousenter fillGridBlocks on mouseup
        gridBlock.addEventListener('mouseup', (e) => { 

            gridBlocks.forEach( (gridBlock) => {

                gridBlock.removeEventListener('mouseenter', fillGridBlocks );
        
            });

        } );

    
    });

}


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


function clearBoard() {

    gridBlocks.forEach( (gridBlock) => {
        gridBlock.style.backgroundColor = 'initial';
    });

}


function fillGridBlocks( e ) {

    console.log(e.type);

    // If the event trigger was a mousedown add fillGridBlocks on mouseenter
    if( e.type === 'mousedown' ){

        currentMouseDownStatus = true;

        gridBlocks.forEach( (gridBlock) => {

            gridBlock.addEventListener('mouseenter', fillGridBlocks );
    
        });

    }


    // Update background-color of target block based on currentFill
    switch ( currentFill ) {

        case 'color':
            e.target.style.backgroundColor = `${currentColor}`;
            break;

        case 'rainbow':
            const rgbValues = generateRainbowColors();
            e.target.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
            break;


        case 'eraser':
            e.target.style.backgroundColor = `initial`;

    }
        

}


function generateRainbowColors() {

    const rainbowArray = [];

    for ( let i = 0; i < 3; i++ ){

        const numberValue = Math.round( Math.random() * 255 );
        rainbowArray.push(numberValue);

    }

    return rainbowArray;

}


// Main Functions
////////////////////


function updateCurrentFill( e ) {

    // Update current fill
    currentFill = e.target.getAttribute('data-fill');


    fillButtons.forEach( (fillButton) => {

        fillButton.classList.remove('active');
    
    });


    e.target.classList.add('active');

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


// Set up base grid block listeners
gridBlockListeners();


fillButtons.forEach( (fillButton) => {

    fillButton.addEventListener('click', updateCurrentFill );

});