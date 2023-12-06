const baseRequestURL = 'https://jsonplaceholder.typicode.com/'
const resultContainer = document.getElementById('result-container')

const endpoints = {
	posts: 'posts',
	comments: 'comments',
	albums: 'albums',
	photos: 'photos',
	todos: 'todos',
	users: 'users',
}

function getRequestURL(endpoint) {
	return `${baseRequestURL}${endpoint}`
}

function sendRequest(endpoint) {
	const url = getRequestURL(endpoint)

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Произошла какая-то ошибка :(')
			}
			return response.json()
		})
		.catch(error => {
			console.log(error)
		})
}

function createContent(item, dataType) {
	switch (dataType) {
		case 'posts':
			return `
			  <div class="userId">User ID: ${item.userId}</div>
        <div class="id">ID: ${item.id}</div>
        <div class="title">Title: ${item.title}</div>
        <div class="body">Body: ${item.body}</div>
      `
		case 'comments':
			return `
				<div class="postId">Post ID: ${item.postId}</div>
        <div class="id">ID: ${item.id}</div>
        <div class="name">Name: ${item.name}</div>
        <div class="email">Email: ${item.email}</div>
        <div class="body">Body: ${item.body}</div>
      `
		case 'albums':
			return `
				<div class="userId">User ID: ${item.userId}</div>
        <div class="id">ID: ${item.id}</div>
        <div class="title">Title: ${item.title}</div>
      `
		case 'photos':
			return `
				<div class="albumId">Album ID: ${item.albumId}</div>
        <div class="id">ID: ${item.id}</div>
        <div class="title">Title: ${item.title}</div>
        <div class="url">URL: ${item.url}</div>
        <div class="thumbnailUrl">Thumbnail URL: ${item.thumbnailUrl}</div>
      `
		case 'todos':
			return `
				<div class="userId">User ID: ${item.userId}</div>
        <div class="id">ID: ${item.id}</div>
        <div class="title">Title: ${item.title}</div>
        <div class="completed">Completed: ${item.completed}</div>
      `
		case 'users':
			return `
        <div class="id">ID: ${item.id}</div>
        <div class="name">Name: ${item.name}</div>
        <div class="username">Username: ${item.username}</div>
        <div class="email">Email: ${item.email}</div>
        <div class="address">
					<p>address</p>
          <div class="street">Street: ${item.address.street}</div>
          <div class="suite">Suite: ${item.address.suite}</div>
          <div class="city">City: ${item.address.city}</div>
          <div class="zipcode">Zipcode: ${item.address.zipcode}</div>
					<div class="geo">
					<p>geo</p>
					<div class="lat">lat: ${item.address.geo.lat}</div>
					<div class="lng">lng: ${item.address.geo.lng}</div>
				</div>
        </div>
				<div class="phone">Phone:${item.phone}</div>
				<div class="website">Website:${item.website}</div>
				<div class="company">
					<p>Company</p>
					<div class="name">Name:${item.company.name}</div>
					<div class="catchPhrase">catchPhrase:${item.company.catchPhrase}</div>
					<div class="bs">bs:${item.company.bs}</div>
				</div>

				
      `
		default:
			return 'Данных пока нет. Нажми на кнопку для получения интересуемых данных с сервера :)'
	}
}

function displayData(data, dataType) {
	resultContainer.innerHTML = ''

	data.forEach(item => {
		const resultItem = document.createElement('div')
		resultItem.classList.add('result__item')
		resultItem.innerHTML = createContent(item, dataType)
		resultContainer.appendChild(resultItem)
	})
}

function addClickListener(elementId, endpoint) {
	document.getElementById(elementId).addEventListener('click', () => {
		sendRequest(endpoint)
			.then(data => displayData(data, elementId.toLowerCase()))
			.catch(err => console.log(err))
	})
}

for (const key in endpoints) {
	addClickListener(key.charAt(0).toUpperCase() + key.slice(1), endpoints[key])
}
