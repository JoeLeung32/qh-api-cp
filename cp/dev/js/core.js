const core = {
	lng: {
		changeTo: (locate) => {
			let result = ''
			const {pathname} = window.location
			const pathArray = pathname.split('/').filter(p => p.length)
			pathArray[0] = locate
			result = '/' + pathArray.join('/')
			window.history.replaceState({}, '', result)
		}
	},
	bind: {
		selectAll: () => {
			Array.from(document.querySelectorAll('label.eleSelect > input[type="checkbox"]'))
				.forEach(obj => {
					obj.addEventListener('change', evt => {
						const parent = evt.target.closest('label')
						const isSelectAllTarget = parent.dataset.select
						if (isSelectAllTarget) {
							Array.from(document.querySelectorAll('label' + isSelectAllTarget))
								.forEach(children => {
									const input = children.querySelector('input[type="checkbox"]')
									input.checked = obj.checked
								})
						} else {
							//
						}
					})
				})
		}
	}
}
