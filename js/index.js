;(function () {
	'use strict'

	const allArticlesUlElement = document.querySelector('#all-articles-section-block ul')
	const newArticlesUlElement = document.querySelector('#new-articles-section-block ul')
	const lastArticleElement = document.querySelector('#last-article-section-block article')
	const readLastArticleAElement = document.querySelector('#read-last-article')

	const articles = []

	init()

	function init () {
		const request = ownFetch.getList()

		request.then(data => {
			articles.push(...data)
			main()
		})

		readLastArticleAElement.addEventListener('click', event => {
			const lastArticle = articles.slice().splice(-1)[0]

			event.preventDefault()
			location.replace(`./article.html?id=${lastArticle.id}`)
		})
	}

	function main () {
		// Обновление списка всех статей википедии
		for (const article of articles) {
			const divElement = document.createElement('div')
			divElement.innerHTML = `<li class="other-list__item"><a class="other-list__link" href="article.html?id=${article.id}">${article.title}</a></li>`

			allArticlesUlElement.append(divElement.firstChild)
		}

		// Обновление списка новых статей
		const newArticles = articles.slice().splice(-3)
		for (const article of newArticles) {
			const divElement = document.createElement('div')
			divElement.innerHTML = `<li class="articles-list-item"><a href="article.html?id=${article.id}" class="articles-list-link">${article.title}</a></li>`

			newArticlesUlElement.append(divElement.firstChild)
		}

		// Обновление последней активной статьи
		const lastArticle = articles.slice().splice(-1)[0]
		lastArticle.content = lastArticle.content.substr(0, 500) + '...'
		lastArticleElement.innerHTML = marked(lastArticle.content)
	}
})();