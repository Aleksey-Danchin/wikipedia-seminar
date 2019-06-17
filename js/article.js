;(function () {
	'use strict'

	const newArticlesUlElement = document.querySelector('#new-articles-section-block ul')
	const articleElement = document.querySelector('#article')
	const editArticleButton = document.querySelector('#edit-article')

	const articles = []
	let currentArticleId = null
	let currentArticle = null

	init()

	function init () {
		if (!location.search) {
			location.replace('./index.html')
		}

		currentArticleId = parseInt(location.search.split('=').splice(-1)[0])

		if (!currentArticleId) {
			location.replace('./index.html')
		}

		const request = ownFetch.getList()

		request.then(data => {
			articles.push(...data)

			for (const article of articles) {
				if (article.id === currentArticleId) {
					currentArticle = article
					break
				}
			}

			if (!currentArticle) {
				location.replace('./index.html')
			}

			main()
		})

		editArticleButton.addEventListener('click', event => {
			event.preventDefault()

			location.replace(`./new.html?id=${currentArticleId}`)
		})
	}

	function main () {
		// Обновление списка новых статей
		const newArticles = articles.slice().splice(-3)
		for (const article of newArticles) {
			const divElement = document.createElement('div')
			divElement.innerHTML = `<li class="articles-list-item"><a href="article.html?id=${article.id}" class="articles-list-link">${article.title}</a></li>`

			newArticlesUlElement.append(divElement.firstChild)
		}

		// Обновление основной статьи
		articleElement.innerHTML = marked(currentArticle.content)
	}
})();