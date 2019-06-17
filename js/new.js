;(function () {
	'use strict'

	const articleTitleInputElement = document.querySelector('#article-title')
	const articleContentElement = document.querySelector('#article-content-section-block textarea')
	const articleMarkedElement = document.querySelector('#new-articles-section-block article')
	const saveArticleButton = document.querySelector('#save-article-button')
	const linksBarSelectElement = document.querySelector('#links-bar')
	const setLinkButton = document.querySelector('#set-link-button')

	const articles = []
	let currentArticleId = null
	let currentArticle = null
	let selectedArticle = null

	init()

	function init () {
		currentArticleId = parseInt(location.search.split('=').splice(-1)[0])

		if (!currentArticleId) {
			currentArticleId = null

			currentArticle = {
				title: '',
				content: ''
			}

			init2()
		}

		else {
			const request = ownFetch.getArticle(currentArticleId)

			request.then(article => {
				currentArticle = article
				init2()
			})			
		}

		saveArticleButton.addEventListener('click', () => {
			const request = ownFetch.saveArticle({
				id: currentArticleId,
				title: articleTitleInputElement.value,
				content: articleContentElement.value
			})

			request.then(result => {
				if (result) {
					location.replace(`./article.html?id=${currentArticleId}`)
				}

				console.error('Some error in Server')
			})
		})
	}

	function init2 () {
		const request = ownFetch.getList()

		request.then(data => {
			articles.push(...data)

			main()
		})
	}

	function main () {
		// Устновка option у выбора links-bar
		const baseArticles = articles.filter(x => x.id !== currentArticleId)

		for (const article of baseArticles) {
			const divElement = document.createElement('div')
			divElement.innerHTML = `<option value="${article.id}">${article.title}</option>`

			linksBarSelectElement.append(divElement.firstChild)
		}

		// Установка значения полей по умолчанию
		articleContentElement.value = currentArticle.content
		articleTitleInputElement.value = currentArticle.title

		contentMarket()

		articleContentElement.addEventListener('keyup', contentMarket)
		setLinkButton.addEventListener('click', setLinkButtonHandler)
	}

	function contentMarket () {
		articleMarkedElement.innerHTML = marked(articleContentElement.value)
	}

	function setLinkButtonHandler (event) {
		event.stopPropagation()
		event.preventDefault()

		const selectedArticleId = parseInt(linksBarSelectElement.value)

		if (selectedArticleId) {
			for (const article of articles) {
				if (article.id === selectedArticleId) {
					selectedArticle = article
					break
				}
			}

			const start = articleContentElement.selectionStart
			const finish = articleContentElement.selectionEnd
			let content = articleContentElement.value

			if (start !== finish) {
				const firstPart = content.substr(0, start)
				const lastPart = content.substr(finish - content.length)
				const replacePart = `[${content.substr(start, finish - start)}](./article.html?id=${selectedArticle.id})`

				content = firstPart + replacePart + lastPart
			}

			articleContentElement.value = content			
		}

		selectedArticle = null

		contentMarket()
		document.querySelector('a[rel="modal:close"]').click()
	}
})();