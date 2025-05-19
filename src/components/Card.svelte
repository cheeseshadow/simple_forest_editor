<script lang="ts">
	import { Dragndrop } from '$lib/dragndrop.svelte.js'
	import { onMount } from 'svelte'
	import { assumeGenderColor, type Gender } from '$lib/utils/drawing'

	export let setElementRef: (el: HTMLDivElement) => void
	let elementRef: HTMLDivElement

	export let id: string
	export let name: string
	export let job: string
	export let gender: Gender

	export let cardSelected: boolean = false
	export let onCardSelected: ((id: string) => void) | null = null

	const color = assumeGenderColor(gender)
	// export let mother: string
	// export let father: string

	const dragndrop = new Dragndrop(id.toString())

	onMount(() => {
		dragndrop.init()
		setElementRef(elementRef)
	})
</script>

<div
	bind:this={elementRef}
	class="card card-like"
	style="top: {dragndrop.y}px; left: {dragndrop.x}px; background: {cardSelected
		? '#F7D9C4'
		: color};"
	onmousedown={dragndrop.startDrag}
	onclick={() => onCardSelected && onCardSelected(id)}
>
	<div class="name">{name}</div>
	<div class="job">{job}</div>
</div>

<style>
	@import '../lib/styles/common.css';

	.card {
		position: absolute;
		padding: 12px;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		user-select: none;
		white-space: nowrap;
	}

	.name {
		font-size: 16px;
		font-weight: 600;
	}

	.job {
		font-size: 12px;
		line-height: 16px;
	}
</style>
