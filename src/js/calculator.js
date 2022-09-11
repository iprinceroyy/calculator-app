class Calculator {
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
		// Avoid multiple '.'
		if (this.currentOperand.includes('.') && number === '.') return;

		// Put zero in front of '.' if not specified
		if (!this.currentOperand) this.currentOperand += 0;

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
		console.log(prev, curr);

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
			case '*':
				computation = prev * curr;
				break;
			case '/':
				computation = prev / curr;
				break;
			default:
				return;
		}

		this.currentOperand = '' + Math.round((computation + Number.EPSILON) * 100) / 100;
		this.operation = undefined;
		this.previousOperand = '';
	}

	formatNumber(number) {
		const integerDigits = parseFloat(number.split('.')[0]);
		const decimalDigits = number.split('.')[1];

		let integerDisplay;
		integerDisplay = !isNaN(integerDigits)
			? integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
			: '';

		return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
	}

	updateDisplay() {
		this.currOperandTextEl.innerText = this.formatNumber(this.currentOperand);

		this.prevOperandTextEl.innerText =
			this.operation != null ? `${this.formatNumber(this.previousOperand)} ${this.operation}` : '';
	}
}

export default Calculator;
