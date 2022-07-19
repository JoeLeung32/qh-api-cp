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
	}
}
