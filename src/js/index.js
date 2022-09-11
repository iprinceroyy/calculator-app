console.log('started.......');
const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const resetBtn = document.querySelector('[data-reset]');
const deleteBtn = document.querySelector('[data-delete]');
const prevOperandTextEl = document.querySelector('[data-previous-operand]');
const currOperandTextEl = document.querySelector('[data-current-operand]');

import Calculator from './calculator';
// window.navigator.vibrate(200)
const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
class App extends Calculator {
	constructor(prevOperandTextEl, currOperandTextEl) {
		super(prevOperandTextEl, currOperandTextEl);

		numBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				audio.play();
				super.appendNumber(btn.value);
				super.updateDisplay();
			});
		});

		operationBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				console.log(btn);
				audio.play();
				super.chooseOperation(btn.value);
				super.updateDisplay();
			});
		});

		equalsBtn.addEventListener('click', () => {
			audio.play();
			super.calculate();
			super.updateDisplay();
		});

		resetBtn.addEventListener('click', () => {
			audio.play();
			super.reset();
			super.updateDisplay();
		});

		deleteBtn.addEventListener('click', () => {
			audio.play();
			super.delete();
			super.updateDisplay();
		});

		document.addEventListener('keydown', e => {
			audio.play();
			if (isFinite(e.key)) super.appendNumber(e.key);
			if ('+-*/'.includes(e.key)) super.chooseOperation(e.key);
			if (e.key === '=' || e.key === 'Enter') super.calculate();
			if (e.key === 'Delete') super.reset();
			if (e.key === 'Backspace') super.delete();

			super.updateDisplay();
		});
	}
}

const calculator = new App(prevOperandTextEl, currOperandTextEl);
