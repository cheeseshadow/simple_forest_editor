<script lang="ts">
	import { Dragndrop } from '$lib/dragndrop.svelte'
	import Card from '../components/Card.svelte'
	import Menu from '../components/Menu.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { drawLines, getCenter, getMiddle } from '$lib/utils/drawing'
	import type { Item, Line } from '$lib/utils/types'
	import { type SavedItem, saveFile } from '$lib/utils/files'
	import { loadCards, resetCards, saveCards, savePositions } from '$lib/utils/dragndrop'

	let canvas: HTMLCanvasElement
	let container: HTMLDivElement

	let selectedCard: number | null = null

	const resizeCanvas = () => {
		if (!canvas || !container) return
		const containerRect = container.getBoundingClientRect()
		canvas.width = containerRect.width
		canvas.height = containerRect.height
	}

	const updateGraph = (data: Item[]) => {
		if (!canvas || !container) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const parentConnectionLines: Line[] = []
		const childrenConnectionLines: Line[] = []
		const selectedParentConnectionLines: Line[] = []
		const selectedChildrenConnectionLines: Line[] = []

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.beginPath()

		for (let item of data) {
			if (!divRefs[item.id]) continue
			const parents = [item.mother, item.father].filter((i) => i !== null)
			const itemCoords = getCenter(divRefs[item.id], dragndrop.position)

			let parentConnections =
				selectedCard === null
					? parentConnectionLines
					: parents.some((parentId) => selectedCard === parentId)
						? selectedParentConnectionLines
						: parentConnectionLines

			let childrenConnections =
				selectedCard === null
					? childrenConnectionLines
					: item.id === selectedCard
						? selectedChildrenConnectionLines
						: childrenConnectionLines

			let parentNode = null
			// connect parents
			const parentPositions = parents.map((parentId) => {
				return getCenter(divRefs[parentId], dragndrop.position)
			})
			if (parentPositions.length === 2) {
				parentConnections.push({
					start: parentPositions[0],
					end: parentPositions[1]
				})

				parentNode = getMiddle(parentPositions[0], parentPositions[1])
			} else if (parentPositions.length === 1) {
				parentNode = parentPositions[0]
			}

			if (parentNode) {
				childrenConnections.push({
					start: parentNode,
					end: itemCoords
				})
			}
		}

		drawLines(parentConnectionLines, ctx, '#C9E4DE')
		drawLines(childrenConnectionLines, ctx, '#DBCDF0')
		drawLines(selectedParentConnectionLines, ctx, '#F7D9C4')
		drawLines(selectedChildrenConnectionLines, ctx, '#F7D9C4')
	}

	const dragndrop = new Dragndrop()
	let cards: Item[] = []

	const divRefs: { [key: string]: HTMLDivElement } = {}

	const onCardSelected = (id: string) => {
		// selectedCard = id
		// updateGraph(cards)
		console.log(id)
	}

	// const dropCardSelection = () => {
	// 	selectedCard = null
	// 	updateGraph(cards)
	// }

	const initScene = (savedCards: SavedItem[]) => {
		resetCards()
		savePositions(savedCards)
		cards = savedCards.map((savedItem) => savedItem.item)
		saveCards(cards)
	}

	const onFileLoaded = (fileContent: string) => {
		try {
			const jsonData = JSON.parse(fileContent)
			if (Array.isArray(jsonData)) {
				const savedItems = jsonData as SavedItem[]
				initScene(savedItems)
			} else {
				alert('Invalid JSON data')
			}
		} catch (error) {
			alert(`Error parsing JSON: ${error}`)
		}
	}

	const onSaveFile = () => {
		const savedItems: SavedItem[] = cards.map((item) => {
			const styles = window.getComputedStyle(divRefs[item.id])
			return {
				item,
				position: {
					x: parseInt(styles.left),
					y: parseInt(styles.top)
				}
			}
		})

		saveFile(savedItems)
	}

	onMount(() => {
		window.addEventListener('resize', resizeCanvas)
		window.addEventListener('mousemove', () => {
			updateGraph(cards)
		})
		resizeCanvas()

		const savedCards = loadCards()
		if (savedCards) {
			cards = savedCards
			// initScene(savedCards)
			updateGraph(cards)
		}
	})

	onDestroy(() => {
		// if (window) window.removeEventListener('resize', resizeCanvas)
	})
</script>

<svelte:head>
	<title>json editor</title>
	<meta name="description" content="Json tree editor" />
</svelte:head>

<div class="main-canvas" onmousedown={dragndrop.startDrag} bind:this={container}>
	<Menu {onFileLoaded} {onSaveFile} />
	<canvas class="backdrops" bind:this={canvas}></canvas>
	<div class="container-background">
		<div class="main-container" style="translate: {dragndrop.x}px {dragndrop.y}px;">
			{#each cards as card (card.id)}
				<Card
					setElementRef={(el: HTMLDivElement) => (divRefs[card.id] = el)}
					{onCardSelected}
					cardSelected={selectedCard === card.id}
					id={card.id}
					name={card.name}
					job={card.job}
					gender={card.gender}
				></Card>
			{/each}
		</div>
	</div>
</div>

<style>
	.main-canvas {
		flex: 1;
		display: flex;
		padding: 10px;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.main-container {
		position: relative;
		/*flex: 1;*/
		border-radius: 20px;
		/*overflow: hidden;*/
	}

	.backdrops {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 20px;
	}

	.container-background {
		flex: 1;
		display: flex;
		background: radial-gradient(circle, #bbb 1px, transparent 2px);
		background-size: 20px 20px;
	}
</style>
