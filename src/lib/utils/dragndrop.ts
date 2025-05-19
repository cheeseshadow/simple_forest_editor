import type { Item, Point } from '$lib/utils/types'
import type { SavedItem } from '$lib/utils/files'

export const resetCards = () => {
	sessionStorage.clear()
}

export const saveCards = (cards: Item[]) => {
	const jsonString = JSON.stringify(cards)
	sessionStorage.setItem('temp_cards', jsonString)
}

export const loadCards = (): Item[] => {
	const savedCards = sessionStorage.getItem('temp_cards')
	if (savedCards) {
		return JSON.parse(savedCards)
	}
	return []
}

export const savePositions = (cards: SavedItem[]) => {
	for (const card of cards) {
		savePosition(card.item.id, card.position)
	}
}

export const initPositions = (cards: SavedItem[]) => {
	sessionStorage.clear()
	saveCards(cards.map((c) => c.item))
	for (const card of cards) {
		savePosition(card.item.id, card.position)
	}
}

export const savePosition = (id: string, position: Point) => {
	sessionStorage.setItem('dragndrop' + id, JSON.stringify(position))
}

export const loadPosition = (id: string): Point | null => {
	const savedPosition = sessionStorage.getItem('dragndrop' + id)
	if (savedPosition) {
		return JSON.parse(savedPosition)
	}
	return null
}
