class Calculator {
	currentOperand = '';
	previousOperand = '';
	operation;
	prevOperandTextEl;
	currOperandTextEl;
	prevOperator = '';

	/**
	 * @param {Element} prevOperandTextEl
	 * @param {Element} currOperandTextEl
	 * @this {Object} an instance of Calculator
	 */
	constructor(prevOperandTextEl, currOperandTextEl) {
		this.prevOperandTextEl = prevOperandTextEl;
		this.currOperandTextEl = currOperandTextEl;
	}

	_reset() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operator = undefined;
	}

	// Delete digits one at a time from back
	_delete() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	/**
	 * Append a number
	 * @param {string | number} number
	 * @protected
	 */
	_appendNumber(number) {
		// Avoid multiple '.'
		if (this.currentOperand.includes('.') && number === '.') return;

		// Put zero in front of '.' if not specified
		if (number === '.' && !this.previousOperand && !this.currentOperand) this.currentOperand += 0;

		this.currentOperand += number;
	}

	/**
	 * Append operator to the current operand value &
	 * make it previous operand in order to get second
	 * operand for calculations
	 * @param {string} operator
	 * @protected
	 */
	_chooseOperation(operator) {
		// If previous value exists then calculate it first
		this.previousOperand && this._calculate();

		this.operator = operator;
		// If current operand is not blank, i.e. after operator second operand is being passed
		if (this.currentOperand !== '') this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	/**
	 * Calculate the result and append it to the current operand
	 * @protected
	 */
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

	/**
	 * Format the number
	 * @param {string | number} number - A digit
	 * @returns {number} Formatted number
	 */
	_formatNumber(number) {
		const integerDigits = parseFloat(number.split('.')[0]);
		const decimalDigits = number.split('.')[1];

		let integerDisplay;
		integerDisplay = !isNaN(integerDigits)
			? integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
			: '';

		return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
	}

	/**
	 * Update the result and display
	 */
	_updateDisplay() {
		this.currOperandTextEl.innerText = this._formatNumber(this.currentOperand);

		this.prevOperandTextEl.innerText =
			this.operator != null ? `${this._formatNumber(this.previousOperand)} ${this.operator}` : '';
	}
}

export default Calculator;
