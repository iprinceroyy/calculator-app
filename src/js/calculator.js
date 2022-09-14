class Calculator {
	currentOperand = '';
	previousOperand = '';
	operation;
	prevOperandTextEl;
	currOperandTextEl;
	prevOperator = '';

	constructor(prevOperandTextEl, currOperandTextEl) {
		this.prevOperandTextEl = prevOperandTextEl;
		this.currOperandTextEl = currOperandTextEl;
	}

	_reset() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operator = undefined;
	}

	_delete() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	_appendNumber(number) {
		// Avoid multiple '.'
		if (this.currentOperand.includes('.') && number === '.') return;

		// Put zero in front of '.' if not specified
		if (number === '.' && !this.previousOperand && !this.currentOperand) this.currentOperand += 0;

		this.currentOperand += number;
	}

	_chooseOperation(operator) {
		// If previous value exist then calculate first it
		this.previousOperand && this._calculate();

		this.operator = operator;
		// If current operand is type
		if (this.currentOperand !== '') this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	_calculate() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(curr)) return;

		switch (this.operator) {
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
		this.operator = undefined;
		this.previousOperand = '';
	}

	_formatNumber(number) {
		const integerDigits = parseFloat(number.split('.')[0]);
		const decimalDigits = number.split('.')[1];

		let integerDisplay;
		integerDisplay = !isNaN(integerDigits)
			? integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
			: '';

		return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
	}

	_updateDisplay() {
		this.currOperandTextEl.innerText = this._formatNumber(this.currentOperand);

		this.prevOperandTextEl.innerText =
			this.operator != null ? `${this._formatNumber(this.previousOperand)} ${this.operator}` : '';
	}
}

export default Calculator;
