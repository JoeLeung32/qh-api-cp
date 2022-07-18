const __evtOL = []
const __evtOR = []

const eventListener = {
	onload: {
		add: (callback, priority = 0) => {
			__evtOL.push({c: callback, p: priority})
			__evtOL.sort((a, b) => b.p - a.p)
		}
	},
	resize: {
		add: (callback, priority = 0) => {
			__evtOR.push({c: callback, p: priority})
			__evtOR.sort((a, b) => b.p - a.p)
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

window.onresize = (evt) => {
	if (__evtOR && __evtOR.length) {
		__evtOR.forEach((e) => {
			if (typeof e.c === 'function') {
				e.c(evt)
			}
		})
	}
}
