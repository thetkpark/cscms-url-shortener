const submitBtn = document.getElementById('btn-submit')

submitBtn.addEventListener('click', () => {
	const input = document.getElementById('longurl').value
	console.log(input)
	fetch('/api/newUrl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ url: input })
	}).then(res => {
		console.log(res.json())
		const display = document.getElementById('shorten-url')
		display.innerHTML = res.json().shortUrl
	})
})
