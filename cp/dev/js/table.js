class Table {
	#className = null;
	#parent = null;
	#parentObj = null;
	#headers = null;
	#dataCell = null;
	#object = null;
	#defaultLoadingMessage = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

	constructor(className, options) {
		this.#className = className;
		if (options.parent) {
			this.#parent = options.parent;
		}
		if (options.header) {
			this.#headers = options.header;
		}
		if (options.dataCell) {
			this.#dataCell = options.dataCell;
		}
	}

	init() {
		this.#parentObj = document.querySelector(this.#parent);
		if (!this.#parentObj) return;

		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');
		const tfoot = document.createElement('tfoot');

		table.className = 'hyper-responsive-table';

		if (this.#className) {
			if (typeof this.#className === 'object') {
				table.classList.add(...this.#className);
			} else if (this.#className.search(' ') >= 0) {
				table.classList.add(...this.#className.split(' '));
			} else {
				table.classList.add(this.#className);
			}
		}

		if (this.#headers && this.#headers.length) {
			const tr = document.createElement('tr');
			this.#headers.forEach(function (header) {
				const cell = document.createElement('th');
				cell.innerText = header.plainText;
				tr.appendChild(cell);
			});
			thead.appendChild(tr);
		}


		table.appendChild(thead)
		table.appendChild(tbody)
		table.appendChild(tfoot)

		this.#parentObj.appendChild(table);
		this.#object = table;
		return this;
	}

	isLoading(content) {
		this.#rewriteTbody(content ? content : this.#defaultLoadingMessage);
		return this;
	}

	data(dataArray) {
		const tbody = this.#object.querySelector('tbody');
		if (!dataArray || !dataArray.length) {
			this.#rewriteTbody('No Data.');
			return;
		}
		const headers = this.#headers;
		const dataCell = this.#dataCell;
		tbody.innerHTML = '';
		dataArray.forEach(function (data) {
			const tr = document.createElement('tr');
			headers.forEach(function (header) {
				const {key, plainText, className, width} = header;
				const cell = document.createElement('td');
				const span = document.createElement('span');
				const div = document.createElement('div');
				cell.dataset.header = plainText;
				cell.dataset.key = key;
				switch (true) {
					case ['number', 'string'].includes(typeof dataCell[key]): {
						span.innerHTML = dataCell[key];
						cell.appendChild(span);
						break;
					}
					case ['function'].includes(typeof dataCell[key]): {
						cell.appendChild(div)
						dataCell[key](data, div);
						break;
					}
					default: {
						break;
					}
				}
				if (['number', 'string'].includes(typeof data[key])) {
					cell.innerHTML = '';
					span.innerHTML = data[key];
					cell.appendChild(span);
				}
				tr.appendChild(cell);
			});
			tbody.appendChild(tr);
		})
		return this;
	}

	#rewriteTbody(content) {
		const tbody = this.#object.querySelector('tbody');
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.setAttribute('colspan', this.#headers.length);
		td.className = 'text-center message py-5';
		td.innerHTML = content;
		tr.appendChild(td);
		tbody.innerHTML = '';
		tbody.appendChild(tr);
	}
}
