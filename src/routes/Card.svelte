<script lang="ts">
	import { DragndropSvelte } from '$lib/dragndrop.svelte'
	import { onMount } from 'svelte'

	let props = $props()
	if (!props.id) {
		throw new Error('id is required for a card')
	}
	const dragndrop = new DragndropSvelte(props.id)

	onMount(() => {
		dragndrop.init()
	})
</script>

<div
	class="card"
	style="top: {dragndrop.y}px; left: {dragndrop.x}px;"
	onmousedown={dragndrop.startDrag}
>
	<!--	<h1>json editor</h1>-->
	<!--	<p>json tree editor</p>-->
	<!--	<p>drag the pink box</p>-->
	gay
</div>

<style>
	.card {
		position: absolute;
		width: 100px;
		height: 100px;
		background: pink;
		border: 2px solid pink;
		border-radius: 8px;
	}
</style>
