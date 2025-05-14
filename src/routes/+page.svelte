<script lang="ts">
	import { DragndropSvelte } from '$lib/dragndrop.svelte'
	import Card from '../components/Card.svelte'
	import Menu from '../components/Menu.svelte'
	import type { Item } from '$lib/utils'
	import { onDestroy, onMount } from 'svelte'

	/*
	"id" : Int,
  "name" : String,
  "birth date" : String,
  "death date" : String,
  "profession" : String,
  "mother" : Int,
  "father" : Int
	 */
	let canvas: HTMLCanvasElement
	let container: HTMLDivElement

	const resizeCanvas = () => {
		if (!canvas || !container) return
		const containerRect = container.getBoundingClientRect()
		canvas.width = containerRect.width
		canvas.height = containerRect.height
	}

	const updateLine = () => {
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.beginPath()

		let prevBr = false
		for (let key in divRefs) {
			const item = divRefs[key]
			const x = item.offsetLeft + item.offsetWidth / 2 + dragndrop.x
			const y = item.offsetTop + item.offsetHeight / 2 + dragndrop.y

			if (!prevBr) {
				ctx.moveTo(x, y)
				prevBr = true
			} else {
				ctx.lineTo(x, y)
			}
			ctx.strokeStyle = 'red'
			ctx.lineWidth = 2
			ctx.stroke()
		}

		// const div1 = divRefs[0]
		// const div2 = divRefs[1]
		// const r1 = div1.getBoundingClientRect()
		// const r2 = div2.getBoundingClientRect()
		// // Get centers, adjust by current scroll
		// const line = {
		// 	x1: r1.left + r1.width / 2,
		// 	y1: r1.top + r1.height / 2,
		// 	x2: r2.left + r2.width / 2,
		// 	y2: r2.top + r2.height / 2
		// }
		// lines = [...lines, line]
	}

	const dragndrop = new DragndropSvelte()
	const cards: Item[] = [
		{
			id: 0,
			name: 'John Doe',
			job: 'Software Engineer',
			gender: 'male',
			mother: 1,
			father: 2
		},
		{
			id: 1,
			name: 'Jane Smith',
			job: 'Data Scientist',
			gender: 'female',
			mother: 3,
			father: 4
		},
		{
			id: 2,
			name: 'Alice Johnson',
			job: 'Product Manager',
			gender: 'female',
			mother: 5,
			father: 6
		}
	]

	const divRefs: { [key: number]: HTMLDivElement } = {}

	onMount(() => {
		window.addEventListener('resize', resizeCanvas)
		resizeCanvas()
		updateLine()
	})

	onDestroy(() => {
		// if (window) window.removeEventListener('resize', resizeCanvas)
	})
</script>

<svelte:head>
	<title>json editor</title>
	<meta name="description" content="Json tree editor" />
</svelte:head>

<div
	class="main-canvas"
	onmousedown={dragndrop.startDrag}
	onmouseup={updateLine}
	bind:this={container}
>
	<Menu />
	<canvas class="backdrops" bind:this={canvas}>
		<!--		<line x1="0" y1="0" x2="100" y2="100" stroke="red" stroke-width="2" />-->
		<!--		{#each lines as line (line)}-->
		<!--			<line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="red" stroke-width="2" />-->
		<!--		{/each}-->
	</canvas>
	<div class="container-background">
		<div class="main-container" style="translate: {dragndrop.x}px {dragndrop.y}px;">
			{#each cards as card (card.id)}
				<Card
					setElementRef={(el: HTMLDivElement) => (divRefs[card.id] = el)}
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
