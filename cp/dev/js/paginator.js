class Paginator {
	#className = null;
	#parent = null;
	#parentObj = null;
	#firstPageString = null;
	#lastPageString = null;
	#prevPageString = null;
	#nextPageString = null;
	#startForm = 1;
	#maxPage = null;
	#displayLength = 5;
	#eachPageMaxItems = 10;
	#onClick = null;
	#currentPageNumber = null;
	#navObject = null;
	#controllerObject = null;
	#pageWording = ' / Page';

	constructor(className, options) {
		this.#className = className;
		if (options.parent) {
			this.#parent = options.parent;
		}
		if (options.firstPageString) {
			this.#firstPageString = options.firstPageString;
		}
		if (options.lastPageString) {
			this.#lastPageString = options.lastPageString;
		}
		if (options.prevPageString) {
			this.#prevPageString = options.prevPageString;
		}
		if (options.nextPageString) {
			this.#nextPageString = options.nextPageString;
		}
		if (options.startForm) {
			this.#startForm = options.startForm;
		}
		if (options.maxPage) {
			this.#maxPage = options.maxPage;
		}
		if (options.displayLength) {
			this.#displayLength = options.displayLength;
		}
		if (options.eachPageMaxItems) {
			this.#eachPageMaxItems = options.eachPageMaxItems;
		}
		if (options.pageWording) {
			this.#pageWording = options.pageWording;
		}
		if (options.onClick) {
			this.#onClick = options.onClick;
		}
	}

	init() {
		this.initNavBasic();
		this.initController();
	}

	initNavBasic() {
		this.#parentObj = document.querySelector(this.#parent);
		if (!this.#parentObj) return;

		const nav = document.createElement('nav');
		const ul = document.createElement('ul');
		nav.className = 'paginator--main';
		this.#doGenPageItems(ul, this.#startForm);
		nav.appendChild(ul);
		this.#parentObj.appendChild(nav);
		this.#navObject = nav;
		this.#doActivePage();
	}

	initController() {
		this.#parentObj = document.querySelector(this.#parent);
		if (!this.#parentObj) return;

		const controller = document.createElement('div');
		controller.className = 'paginator--prepage';
		this.#parentObj.appendChild(this.#doGenController(controller));
		this.#controllerObject = controller;
	}

	updateController(number) {
		this.#eachPageMaxItems = number;
		this.#doGenController(this.#controllerObject);
	}

	#doGenController(controller) {
		const spanPageMaxItem = document.createElement('span');
		const span = document.createElement('span');
		spanPageMaxItem.innerHTML = this.#eachPageMaxItems;
		span.innerHTML = this.#pageWording;
		controller.innerHTML = '';
		controller.appendChild(spanPageMaxItem);
		controller.appendChild(span);
		return controller;
	}

	#doGenNewLi(content, type, number) {
		const object = this;
		const li = document.createElement('li');
		li.dataset.type = type;
		if (number) {
			li.dataset.number = number;
		}
		li.innerHTML = content;
		li.addEventListener('click', function () {
			switch (true) {
				case type === 'first': {
					number = 1;
					break;
				}
				case type === 'last': {
					number = object.#maxPage;
					break;
				}
				case type === 'prev': {
					number = object.#currentPageNumber - 1;
					break;
				}
				case type === 'next': {
					number = object.#currentPageNumber + 1;
					break;
				}
				default: {
					break;
				}
			}
			object.#doUpdatePageItem(type, number);
			if (object.#onClick && typeof object.#onClick === 'function') {
				object.#onClick(type, number || null);
			}
		})
		return li;
	}

	#doGenPageItems(parent, startForm) {
		let renderLength = Number(this.#displayLength) * 2;
		let startNumber = Number(startForm) - Number(this.#displayLength);
		let endNumber = 0;
		// --- Start Number START
		if (startNumber <= 0) {
			startNumber = 1;
		}
		if (this.#maxPage && startNumber + renderLength > this.#maxPage) {
			startNumber += this.#maxPage - (startNumber + renderLength);
		}
		if (startNumber <= 0) {
			startNumber = 1;
		}
		// --- Start Number END
		// --- End Number START
		endNumber = startNumber + renderLength;
		if (this.#maxPage && endNumber > this.#maxPage) {
			endNumber = this.#maxPage;
		}
		// --- End Number END
		if (startForm !== startNumber) {
			if (this.#firstPageString) {
				parent.appendChild(this.#doGenNewLi(this.#firstPageString, 'first'));
			}
			if (this.#prevPageString) {
				parent.appendChild(this.#doGenNewLi(this.#prevPageString, 'prev'));
			}
		}
		for (let i = startNumber; i <= endNumber; i++) {
			parent.appendChild(this.#doGenNewLi(i, 'indicator', i));
		}
		if (startForm !== endNumber) {
			if (this.#nextPageString) {
				parent.appendChild(this.#doGenNewLi(this.#nextPageString, 'next'));
			}
			if (this.#lastPageString) {
				parent.appendChild(this.#doGenNewLi(this.#lastPageString, 'last'));
			}
		}
		this.#currentPageNumber = startForm;
	}

	#doActivePage() {
		const number = this.#currentPageNumber;
		const pages = this.#navObject.querySelectorAll('[data-type="indicator"]');
		const activePage = this.#navObject.querySelector('[data-type="indicator"][data-number="' + number + '"]');
		pages.forEach(function (page) {
			page.classList.remove('active');
		})
		if (activePage) {
			activePage.classList.add('active');
		}
	}

	#doUpdatePageItem(type, number) {
		const parent = this.#navObject.querySelector('ul');
		const pageItems = this.#navObject.querySelectorAll('li[data-type]');
		pageItems.forEach(function (pageItem) {
			pageItem.remove();
		})
		this.#doGenPageItems(parent, number);
		this.#doActivePage();
	}
}
