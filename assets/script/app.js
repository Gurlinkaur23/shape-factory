'use strict';

// Imports
import { onEvent, select } from './utils.js';
import Shape from './Shape.js';

// Selections
const selectShape = select('.select-shape');
const selectColor = select('.select-color');
const createBtn = select('.create');
const clearBtn = select('.clear');
const shapeContainer = select('.shape-container');
const infoText = select('.info-text');

/* - - - - - - Main code - - - - - - - */

const shapesArr = [];

const colors = {
  blue: '#09f',
  green: '#9f0',
  orange: '#f90',
  pink: '#f09',
  purple: '#90f',
};

const maxShapes = 24;

// Function to create shapes
function createShape() {
  if (shapesArr.length >= maxShapes) {
    infoText.innerText = 'Storage is full! Cannot add more shapes :(';
    return;
  }

  let selectedShape = selectShape.value;
  let selectedColor = selectColor.value;

  console.log('Selected Shape:', selectedShape);

  const shape = new Shape(selectedShape, selectedColor);
  shapesArr.push(shape);

  const shapeDiv = document.createElement('div');
  shapeDiv.classList.add(selectedShape);
  shapeDiv.style.backgroundColor = colors[selectedColor];

  onEvent('click', shapeDiv, function () {
    displayInfo(shape);
  });

  appendShape(shapeDiv);
}

// Function to append the shapes in the contianer
function appendShape(shapeDiv) {
  let columns = 6;
  let index = shapesArr.length - 1;

  // Calculating grid position
  let columnPosition = index % columns;
  let rowPosition = Math.floor(index / columns);

  // Reversing the order of rows
  let reversedRow = 4 - rowPosition;

  shapeDiv.style.gridColumn = columnPosition + 1;
  shapeDiv.style.gridRow = reversedRow;
  shapeContainer.append(shapeDiv);
}

// Function to display shape info
function displayInfo(shape) {
  let shapeIndex = shapesArr.indexOf(shape) + 1;
  infoText.innerText = `Unit ${shapeIndex}: ${shape.getInfo()}`;
}

// Function to clear the container
function clearContainer() {
  shapeContainer.innerHTML = '';
  infoText.innerHTML =
    'Create shapes by selecting options and clicking "Create" :)';
  shapesArr.length = 0;

  selectShape.value = '';
  selectColor.value = '';
}

// Events
onEvent('click', createBtn, function () {
  createShape();
});

onEvent('click', clearBtn, function () {
  clearContainer();
});
