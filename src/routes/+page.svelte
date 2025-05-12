<script lang="ts">
	import { DragndropSvelte } from '$lib/dragndrop.svelte'
	import Card from './Card.svelte'

	const dragndrop = new DragndropSvelte()
</script>

<svelte:head>
	<title>json editor</title>
	<meta name="description" content="Json tree editor" />
</svelte:head>

<div class="main-canvas" onmousedown={dragndrop.startDrag}>
	<div class="main-container" style="translate: {dragndrop.x}px {dragndrop.y}px;">
		<Card id="0"></Card>
		<Card id="1"></Card>
	</div>
</div>

<style>
	.main-canvas {
		flex: 1;
		background: radial-gradient(circle, #bbb 1px, transparent 2px);
		background-size: 20px 20px;
		overflow: hidden;
	}

	.main-container {
		position: relative;
		/*width: 100px;*/
		/*height: 100px;*/
		/*background: pink;*/
	}
</style>
