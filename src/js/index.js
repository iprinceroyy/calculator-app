import Calculator from './calculator';

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

		// Event listener is added to the element on object creation
		toggler.addEventListener('input', this._toggleHandler.bind(this));
		keypad.addEventListener('click', this._keyHandler.bind(this));
		document.addEventListener('keydown', this._keydownHandler.bind(this));
	}

	/**
	 * Handles click event on buttons
	 * @param {Object} e - Event
	 */
	_keyHandler(e) {
		if (!e.target.classList.contains('key')) return;

		// Add audio to all buttons
		btnAudio.volume = 0.08;
		btnAudio.play();
		const btn = e.target;

		if (btn.classList.contains('key_num')) super._appendNumber(btn.textContent);
		else if (btn.classList.contains('key_operation')) super._chooseOperation(btn.textContent);
		else if (btn.classList.contains('key_equal')) super._calculate();
		else if (btn.classList.contains('key_reset')) super._reset();
		else if (btn.classList.contains('key_delete')) super._delete();

		super._updateDisplay();
	}

	/**
	 * Handles keypress event of keyboard
	 * @param {Object} e - Event
	 */
	_keydownHandler(e) {
		btnAudio.play();

		if (isFinite(e.key)) super._appendNumber(e.key);
		else if ('+-*/'.includes(e.key)) super._chooseOperation(e.key);
		else if (e.key === '=' || e.key === 'Enter') super._calculate();
		else if (e.key === 'Delete') super._reset();
		else if (e.key === 'Backspace') super._delete();

		super._updateDisplay();
	}

	/**
	 * Handles toggle button
	 * @param {Object} e - event
	 */
	_toggleHandler(e) {
		const btn = e.target;
		if (!btn.classList.contains('radio')) return;

		toggleAudio.volume = 0.09;
		toggleAudio.play();
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
