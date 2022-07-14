const __evtOL = []
const __evtRS = []

const eventListener = {
	onload: {
		add: (callback, priority = 0) => {
			__evtOL.push({c: callback, p: priority})
			__evtOL.sort((a, b) => b.p - a.p)
		}
	},
	resize: {
		add: (callback, priority = 0) => {
			__evtRS.push({c: callback, p: priority})
			__evtRS.sort((a, b) => b.p - a.p)
		}
	}
}

window.onload = (evt) => {
	if (__evtOL && __evtOL.length) {
		__evtOL.forEach((e) => {
			if (typeof e.c === 'function') {
				e.c(evt)
			}
		})
	}
}

window.resize = (evt) => {
	if (__evtRS && __evtRS.length) {
		__evtRS.forEach((e) => {
			if (typeof e.c === 'function') {
				e.c(evt)
			}
		})
	}
}
