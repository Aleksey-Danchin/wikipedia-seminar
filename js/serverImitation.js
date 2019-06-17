;(function () {
	'use strict'

	if (!localStorage.getItem('__DB__')) {
		localStorage.setItem('__DB__', JSON.stringify([
			{
				id: 1,
				title: "Some title text 1.",
				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, aliquam, enim. Aliquam iure blanditiis cupiditate voluptate vel ab nemo esse accusantium id illum veritatis quo, modi accusamus cum veniam pariatur, quisquam perferendis eos totam inventore nostrum architecto ipsum perspiciatis officia. Quis quam dignissimos ex magnam blanditiis eligendi itaque laborum laboriosam facilis natus fugiat incidunt illo rerum quia repellat vel atque, quidem consectetur debitis cupiditate minima aspernatur soluta sit eaque ad. Odit saepe tempore praesentium veniam, ea reprehenderit obcaecati ipsam tenetur cupiditate quas recusandae rem consequuntur beatae. Veniam blanditiis commodi quis nisi eaque, ullam facilis perspiciatis aliquam odit! Libero, eum eveniet."
			},
			{
				id: 2,
				title: "Some title text 2.",
				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, aliquam, enim. Aliquam iure blanditiis cupiditate voluptate vel ab nemo esse accusantium id illum veritatis quo, modi accusamus cum veniam pariatur, quisquam perferendis eos totam inventore nostrum architecto ipsum perspiciatis officia. Quis quam dignissimos ex magnam blanditiis eligendi itaque laborum laboriosam facilis natus fugiat incidunt illo rerum quia repellat vel atque, quidem consectetur debitis cupiditate minima aspernatur soluta sit eaque ad. Odit saepe tempore praesentium veniam, ea reprehenderit obcaecati ipsam tenetur cupiditate quas recusandae rem consequuntur beatae. Veniam blanditiis commodi quis nisi eaque, ullam facilis perspiciatis aliquam odit! Libero, eum eveniet."
			},
			{
				id: 3,
				title: "Some title text 3.",
				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, aliquam, enim. Aliquam iure blanditiis cupiditate voluptate vel ab nemo esse accusantium id illum veritatis quo, modi accusamus cum veniam pariatur, quisquam perferendis eos totam inventore nostrum architecto ipsum perspiciatis officia. Quis quam dignissimos ex magnam blanditiis eligendi itaque laborum laboriosam facilis natus fugiat incidunt illo rerum quia repellat vel atque, quidem consectetur debitis cupiditate minima aspernatur soluta sit eaque ad. Odit saepe tempore praesentium veniam, ea reprehenderit obcaecati ipsam tenetur cupiditate quas recusandae rem consequuntur beatae. Veniam blanditiis commodi quis nisi eaque, ullam facilis perspiciatis aliquam odit! Libero, eum eveniet."
			},
			{
				id: 4,
				title: "Some title text 4.",
				content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, aliquam, enim. Aliquam iure blanditiis cupiditate voluptate vel ab nemo esse accusantium id illum veritatis quo, modi accusamus cum veniam pariatur, quisquam perferendis eos totam inventore nostrum architecto ipsum perspiciatis officia. Quis quam dignissimos ex magnam blanditiis eligendi itaque laborum laboriosam facilis natus fugiat incidunt illo rerum quia repellat vel atque, quidem consectetur debitis cupiditate minima aspernatur soluta sit eaque ad. Odit saepe tempore praesentium veniam, ea reprehenderit obcaecati ipsam tenetur cupiditate quas recusandae rem consequuntur beatae. Veniam blanditiis commodi quis nisi eaque, ullam facilis perspiciatis aliquam odit! Libero, eum eveniet."
			}
		]))
	}

	const ownFetch = window.ownFetch = {}

	ownFetch.getList = async () => {
		await delay()

		return JSON.parse(localStorage.getItem('__DB__'))
	}

	ownFetch.getArticle = async id => {
		await delay()

		const articles = JSON.parse(localStorage.getItem('__DB__'))
		for (const article of articles) {
			if (article.id === id) {
				return article
			}
		}

		return null
	}

	ownFetch.saveArticle = async ({ id = false, title, content }) => {
		await delay()

		const articles = JSON.parse(localStorage.getItem('__DB__'))

		if (id) {
			let isSaved = false

			for (const article of articles) {
				if (article.id === id) {
					article.title = title
					article.content = content

					isSaved = true
					break
				}
			}

			if (isSaved) {
				localStorage.setItem('__DB__', JSON.stringify(articles))

				return true				
			}
		}

		const maxId = Math.max(...articles.map(article => article.id))
		const article = {
			id: maxId + 1,
			title,
			content
		}

		articles.push(article)
		localStorage.setItem('__DB__', JSON.stringify(articles))
		
		return true
	}

	function delay (milliseconds = 0) {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}
})();