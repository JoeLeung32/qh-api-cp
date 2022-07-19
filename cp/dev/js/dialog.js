class Dialog {
	#className = null;
	#parent = null;
	#parentObj = null;
	#options = null;
	#object = null;
	#store = null;

	constructor(className, options) {
		const _this = this;
		this.#className = className;
		if (options.parent) {
			this.#parent = options.parent;
		}
		this.#options = options;
		if('visualViewport' in window) {
			window.visualViewport.addEventListener('resize', function(evt) {
				_this.#resize(evt);
			});
		}
	}

	init() {
		this.#parentObj = document.querySelector(this.#parent);
		if (!this.#parentObj) return;

		let object = this;
		let store = null;
		const title = this.#options.title;
		const content = this.#options.content;
		const buttons = this.#options.buttons;
		const canBeCloseByOverlay = this.#options.canBeCloseByOverlay;
		const overlayOnClick = this.#options.overlayOnClick;
		const minSize = this.#options.minSize;
		const dialog = document.createElement('div');
		const dialogOverlay = document.createElement('div');
		const dialogContainer = document.createElement('div');
		const dialogTitle = document.createElement('div');
		const dialogBody = document.createElement('div');
		const dialogFooter = document.createElement('div');

		dialog.className = 'dialog';
		dialogOverlay.className = 'dialog--overlay';
		dialogContainer.className = 'dialog--container';
		dialogTitle.className = 'dialog--title';
		dialogBody.className = 'dialog--body';
		dialogFooter.className = 'dialog--footer';

		if (this.#className) {
			if (typeof this.#className === 'object') {
				dialog.classList.add(...this.#className);
			} else if (this.#className.search(' ') >= 0) {
				dialog.classList.add(...this.#className.split(' '));
			} else {
				dialog.classList.add(this.#className);
			}
		}

		if (buttons && buttons.length) {
			buttons.forEach(function (button) {
				var buttonObj = document.createElement('button');
				buttonObj.className = button.className;
				if (button.text && button.text.length) {
					buttonObj.innerHTML = button.text;
				}
				buttonObj.addEventListener('click', function (evt) {
					if (button.onClick && typeof button.onClick === 'function') {
						store = object.#store;
						button.onClick(evt, object, store);
					}
					if (button.close && typeof button.close === 'boolean') {
						object.hide();
					}
				})
				dialogFooter.appendChild(buttonObj);
			});
			dialogFooter.classList.add('hasContent');
		}

		if (typeof canBeCloseByOverlay === 'boolean' && canBeCloseByOverlay) {
			dialogOverlay.addEventListener('click', function (evt) {
				if (overlayOnClick && typeof overlayOnClick === 'function') {
					store = object.#store;
					overlayOnClick(evt, object, store);
				}
				object.hide();
			})
		}

		if (typeof minSize === 'boolean' && minSize) {
			dialogContainer.classList.add('minSize');
		}

		dialogContainer.appendChild(dialogTitle);
		dialogContainer.appendChild(dialogBody);
		dialogContainer.appendChild(dialogFooter);

		dialog.appendChild(dialogOverlay);
		dialog.appendChild(dialogContainer);

		this.#parentObj.appendChild(dialog);
		this.#object = dialog;

		this.content(content, title);
		return this;
	}

	show() {
		if (!this.#object) return;
		this.#object.classList.add('show');
		document.body.style.overflow = 'hidden';
	}

	hide() {
		if (!this.#object) return;
		this.#object.classList.remove('show');
		document.body.style.overflow = '';
	}

	toggle() {
		if (!this.#object) return;
		this.#object.classList.toggle('show');
		if (this.#object.classList.contains('show')) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	store(object) {
		this.#store = object;
		return this;
	}

	content(content, header) {
		if (!this.#object) return;
		const title = this.#object.querySelector('.dialog--title');
		const body = this.#object.querySelector('.dialog--body');
		title.classList.remove('hasContent');
		body.classList.remove('hasContent');
		title.innerText = '';
		body.innerHTML = '';
		if (content) {
			if (typeof content === 'string' && content.length) {
				body.innerHTML = content;
			} else if (typeof content === 'object') {
				body.innerHTML = '';
				body.appendChild(content);
			}
			body.classList.add('hasContent');
		}
		if (header && header.length) {
			title.innerText = header;
			title.classList.add('hasContent');
		}
		return this;
	}

	callback(callback) {
		if (typeof callback === 'function') {
			callback();
		}
	}

	#resize(evt) {
		if (!this.#object) return;
		const container = this.#object.querySelector('.dialog--container');
		const visualKeyboardHeight = window.innerHeight - evt.target.height;
		let focusedElement = container.querySelector(':focus');
		let theTop;
		if (this.#object.classList.contains('show')) {
			focusedElement = container.querySelector(':focus')
			container.style.paddingBottom = visualKeyboardHeight + 'px';
			if (focusedElement) {
				theTop = focusedElement.getBoundingClientRect().top - 50;
				container.scrollTo({
					top: theTop,
					behavior: 'smooth',
				})
			}
		} else {
			container.style.paddingBottom = '';
		}
	}
}
