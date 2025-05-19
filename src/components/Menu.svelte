<script lang="ts">
	export let onFileLoaded: (fileContent: string) => void = () => {}
	export let onSaveFile: () => void = () => {}

	type MenuSection = 'main' | 'upload'

	let page: MenuSection = 'main'
	let input: HTMLInputElement | null = null

	const loadFile = () => {
		if (!input) return

		if (input.files && input.files.length > 0) {
			const file = input.files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				const fileContent = e.target?.result
				if (input) {
					input.value = ''
				}
				onFileLoaded(fileContent as string)
			}
			reader.readAsText(file)
		} else {
			console.warn('No file selected')
		}
	}
</script>

<div class="menu">
	{#if page === 'main'}
		<button onclick={onSaveFile}>Save</button>
		<button onclick={() => (page = 'upload')}>Load</button>
	{:else if page === 'upload'}
		<form class="form" onsubmit={loadFile}>
			<button onclick={() => (page = 'main')}>Back</button>
			<input type="file" bind:this={input} />
			<button type="submit">Load</button>
		</form>
	{/if}
</div>

<style>
	.menu {
		z-index: 100;
		position: absolute;
		top: 12px;
		right: 12px;

		display: flex;
		gap: 12px;
		flex-direction: column;
		background-color: white;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 12px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
