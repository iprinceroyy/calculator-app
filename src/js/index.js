import Calculator from './calculator';
console.log('started.......');

const prevOperandTextEl = document.querySelector('[data-previous-operand]');
const currOperandTextEl = document.querySelector('[data-current-operand]');
const toggler = document.querySelector('.radio_btns');
const bodyContainer = document.querySelector('body');

const keypad = document.querySelector('.keypad');

const btnAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/641');
const toggleAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/2886');

class App extends Calculator {
	constructor(prevOperandTextEl, currOperandTextEl) {
		super(prevOperandTextEl, currOperandTextEl);

		toggler.addEventListener('input', this._toggleHandler.bind(this));
		keypad.addEventListener('click', this._keyHandler.bind(this));
		document.addEventListener('keydown', this._keydownHanlder.bind(this));
	}

	_keyHandler(e) {
		// Add audio to all buttons
		btnAudio.play();
		const btn = e.target;

		if (btn.classList.contains('key_num')) {
			super._appendNumber(btn.textContent);
			super._updateDisplay();
		} else if (btn.classList.contains('key_operation')) {
			super._chooseOperation(btn.textContent);
			super._updateDisplay();
		} else if (btn.classList.contains('key_equal')) {
			super._calculate();
			super._updateDisplay();
		} else if (btn.classList.contains('key_reset')) {
			super._reset();
			super._updateDisplay();
		} else if (btn.classList.contains('key_delete')) {
			super._delete();
			super._updateDisplay();
		}
	}

	_keydownHanlder(e) {
		btnAudio.play();

		if (isFinite(e.key)) super.appendNumber(e.key);
		else if ('+-*/'.includes(e.key)) super.chooseOperation(e.key);
		else if (e.key === '=' || e.key === 'Enter') super.calculate();
		else if (e.key === 'Delete') super.reset();
		else if (e.key === 'Backspace') super.delete();

		super.updateDisplay();
	}

	_toggleHandler(e) {
		toggleAudio.play();
		const btn = e.target;
		if (!btn.classList.contains('radio')) return;

		const themeNum = btn.dataset.theme;

		btn.closest('.radio_btns').lastElementChild.style.transform = `translateX(${
			1.5 * themeNum - 1.2
		}rem)`;

		// Remove previous theme before adding new one
		bodyContainer.classList.value = '';

		// Add current theme
		bodyContainer.classList.add(`theme-${themeNum}`);
	}
}

const calculator = new App(prevOperandTextEl, currOperandTextEl);
