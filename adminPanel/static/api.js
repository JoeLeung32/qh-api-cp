const xhr = {
	post: (url, data, dataFormat = undefined) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', url, true)
			xhr.setRequestHeader('Content-Type', 'application/json');
			if (!dataFormat) {
				xhr.send(data)
			} else if (dataFormat === 'json') {
				xhr.send(JSON.stringify(data))
			}
			xhr.onload = () => {
				if (xhr.status !== 200) {
					reject(xhr)
				}
				if (!dataFormat) {
					resolve(xhr.responseText)
				} else if (dataFormat === 'json') {
					resolve(JSON.parse(xhr.responseText))
				}
			}
		})
	}
}
const api = {
	login: (data) => {
		return xhr.post('/api/admin/panel/login', data, 'json');
	}
}
