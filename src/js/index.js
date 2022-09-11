console.log('started');
console.log('hello');
const keyContainer = document.querySelector('.keypad');
const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const resetBtn = document.querySelector('[data-reset]');
const deleteBtn = document.querySelector('[data-delete]');
const prevOperandTextEl = document.querySelector('[data-previous-operand]');
const currOperandTextEl = document.querySelector('[data-current-operand]');

class App {
	currentOperand = '';
	previousOperand = '';
	operation;
	prevOperandTextEl;
	currOperandTextEl;

	constructor(prevOperandTextEl, currOperandTextEl) {
		this.prevOperandTextEl = prevOperandTextEl;
		this.currOperandTextEl = currOperandTextEl;
	}

	reset() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	appendNumber(number) {
		if (this.currentOperand.includes('.') && number === '.') return;

		this.currentOperand += number;
	}

	chooseOperation(operation) {
		// If currentOperand is empty
		if (!this.currentOperand) return;

		// If previous value exist then calculate first it
		this.previousOperand && this.calculate();

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	calculate() {
		let computation;
		const prev = +this.previousOperand;
		const curr = +this.currentOperand;

		if (isNaN(prev) || isNaN(curr)) return;

		switch (this.operation) {
			case '+':
				computation = prev + curr;
				break;
			case '-':
				computation = prev - curr;
				break;
			case 'x':
				computation = prev * curr;
				break;
			case '/':
				computation = prev / curr;
				break;
			default:
				return;
		}
		this.currentOperand = '' + computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	formatNumber(number) {
		// const integerDigits = parseFloat(number.split('.')[0]);
		// const decimalDigits = number.split('.')[1];
		const [integerDigits, decimalDigits] = number.split('.');

		let integerDisplay;
		// if (isNaN(integerDigits)) {
		// 	integerDisplay = '';
		// } else {
		// 	integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		// }
		integerDisplay = integerDigits
			? integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
			: '';

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currOperandTextEl.innerText = this.formatNumber(this.currentOperand);
		if (this.operation != null) {
			this.prevOperandTextEl.innerText = `${this.formatNumber(this.previousOperand)} ${
				this.operation
			}`;
		} else this.prevOperandTextEl.innerText = '';
	}
}

const app = new App(prevOperandTextEl, currOperandTextEl);

numBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		app.appendNumber(btn.value);
		app.updateDisplay();
	});
});

operationBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		console.log(btn);
		app.chooseOperation(btn.value);
		app.updateDisplay();
	});
});

equalsBtn.addEventListener('click', function () {
	console.log(this);
	app.calculate();
	app.updateDisplay();
});

resetBtn.addEventListener('click', function () {
	app.reset();
	app.updateDisplay();
});

deleteBtn.addEventListener('click', function () {
	app.delete();
	app.updateDisplay();
});

document.addEventListener('keydown', e => {
	if (isFinite(e.key)) app.appendNumber(e.key);
	if ('+-x/'.includes(e.key)) app.chooseOperation(e.key);
	if (e.key === '=' || e.key === 'Enter') app.calculate();
	if (e.key === 'Delete') app.reset();
	if (e.key === 'Backspace') app.delete();

	app.updateDisplay();
});
