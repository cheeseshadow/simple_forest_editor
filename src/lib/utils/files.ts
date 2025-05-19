import type { Item, Point } from '$lib/utils/types'

export type SavedItem = {
	item: Item
	position: Point
}

export const saveFile = (cards: SavedItem[]) => {
	const jsonString = JSON.stringify(cards)
	const blob = new Blob([jsonString], { type: 'application/json' })
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = 'data.json'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(link.href)
}
