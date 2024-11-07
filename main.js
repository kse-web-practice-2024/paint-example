import { CanvasAPI } from './canvas.js'
import { Paint, DRAW, ERASE } from './paint.js'

const canvasElement = document.querySelector('.canvas-js');

const canvas = new CanvasAPI(canvasElement);
const editor = new Paint(canvas);
editor.setMode(DRAW);

const cleanButton = document.querySelector('.clean-button-js');
cleanButton.addEventListener('click', () => {
    editor.clean()
})

const drawButton = document.querySelector('.draw-button-js');
const eraseButton = document.querySelector('.erase-button-js');
const undoButton = document.querySelector('.undo-button-js');

drawButton.addEventListener('click', () => {
    editor.setMode(DRAW)
    drawButton.classList.add('active');
    eraseButton.classList.remove('active');
})

eraseButton.addEventListener('click', () => {
    editor.setMode(ERASE)
    drawButton.classList.remove('active');
    eraseButton.classList.add('active');
})


undoButton.addEventListener('click', () => {
    editor.undo()
})


/**
 * ctx.lineCap = "round";
 * ctx.lineWidth = number;
 * ctx.strokeStyle = color;
 *
 * cts.beginPath()
 * ctx.moveTo()
 * ctx.lineTo()
 * ctx.stroke()
 *
 * ctx.clearRect()
 */
